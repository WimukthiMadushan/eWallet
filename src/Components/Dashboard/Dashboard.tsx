import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Dashboard.css';
import PieChart from './../PieChart/PieChart';
import axios from 'axios';
import { format } from 'date-fns';
import Trash_image from "./../../assets/trash.png"
import { toast } from "react-toastify";

function Dashboard() {
  const { authState } = useAuth();
  const { userId } = authState;
  const [balance, setBalance] = useState(0.00);
  interface Transaction {
    _id: string;
    date: string;
    category: string;
    amount: number;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`https://54.242.200.246/api/transaction/getTransactions/${userId}`)
      .then((response) => {
        const transactionsData = response.data;
        setTransactions(transactionsData);
        const totalBalance = transactionsData.reduce((acc: any, transaction: { amount: any; }) => acc + transaction.amount, 0);
        setBalance(totalBalance);

        const categoryTotals = transactionsData.reduce((acc: { [key: string]: number }, transaction: Transaction) => {
        if (transaction.amount < 0) {
          if (!acc[transaction.category]) {
              acc[transaction.category] = 0;
          }
          acc[transaction.category] += transaction.amount;
        }
        return acc;
        }, {});

        const chartData = Object.entries(categoryTotals).map(([category, amount]) => [category, Math.abs(amount as number)]);
        setPieChartData([["Category", "Amount"], ...chartData]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  const handleDelete = (Id: any) => {
    axios.delete(`https://54.242.200.246/api/transaction/deleteTransaction/${Id}`)
      .then(() => {
        toast.success('Transaction deleted successfully');

        // Update transactions state
        setTransactions((prevTransactions) => {
          const updatedTransactions = prevTransactions.filter(transaction => transaction._id !== Id);

          // Recalculate balance after transaction removal
          const newBalance = updatedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
          setBalance(newBalance);

          return updatedTransactions;
        });
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
        toast.error('Error deleting transaction');
      });
  };

  return (
    <motion.div
      className="pt-[6rem] px-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between p-6 px-[5rem] bg-white w-full rounded-md mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg font-semibold">Welcome to your Wallet</p>
        <p className="text-lg font-semibold">
          Your balance is:
          <span className={balance >= 0 ? "text-green-500" : "text-red-500"}>
            Rs.{balance.toFixed(2)}
          </span>
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 mt-8 w-full">
        {/* Recent Income/Expenses Section */}
        <motion.div
          className="flex-1 bg-white p-6 rounded-md shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Recent Income/Expenses</h2>
          {transactions.length === 0 ? (
            <p className="text-center text-lg">No Transaction made</p>
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-4">Date</th>
                    <th className="border p-4">Description</th>
                    <th className="border p-4">Amount</th>
                    <th className="border p-4">Delete</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {transactions.map((transaction) => (
                    <motion.tr
                      key={transaction._id}
                      className="hover:bg-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <td className="border p-4">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
                      <td className="border p-4">{transaction.category}</td>
                      <td className={`border p-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        Rs.{transaction.amount.toFixed(2)}
                      </td>
                      <td className="text-center border p-4">
                        <button onClick={() => handleDelete(transaction._id)}>
                          <img src={Trash_image} alt="trash image" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Link to={`/addtransaction/${userId}`}>
            <motion.button
              className="border rounded-md py-2 px-8 mt-4 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Transaction
            </motion.button>
          </Link>
        </motion.div>

        {/* My Expenses Section (Pie Chart) */}
        <motion.div
          className="flex-1 bg-white p-6 rounded-md shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
          <motion.div
            className="h-64 flex items-center justify-center bg-gray-100 rounded-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PieChart data={pieChartData} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
