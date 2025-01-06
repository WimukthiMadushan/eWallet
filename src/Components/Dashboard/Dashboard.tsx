import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Dashboard.css';
import PieChart from './../PieChart/PieChart';

function Dashboard() {
  const [balance, setBalance] = useState(0.00);
  const transactions = [
    { id: 1, description: "Grocery Shopping", amount: -50.75, date: "2025-01-04" },
    { id: 2, description: "Salary", amount: 1500.00, date: "2025-01-01" },
    { id: 3, description: "Electricity Bill", amount: -100.00, date: "2024-12-28" },
    { id: 4, description: "Dinner with Friends", amount: -30.00, date: "2024-12-25" },
    { id: 5, description: "Gift from Uncle", amount: 200.00, date: "2024-12-20" },
    { id: 6, description: "Car Repair", amount: -500.00, date: "2024-12-15" },
    { id: 7, description: "Pocket Money", amount: 50.00, date: "2024-12-10" },
    { id: 8, description: "House Rent", amount: -800.00, date: "2024-12-05" },
    { id: 9, description: "Freelancing", amount: 300.00, date: "2024-12-01" },
    { id: 10, description: "Internet Bill", amount: -50.00, date: "2024-11-25" },
  ];
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  return (
    <motion.div
      className="pt-[6rem] px-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-between p-6 px-[5rem] bg-white w-full rounded-md mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg font-semibold">Welcome to your Wallet</p>
        <p className="text-lg font-semibold">Your balance is: <span className="text-green-500">${balance.toFixed(2)}</span></p>
      </motion.div>
      <div className="flex gap-8">
        <motion.div
          className="flex-1 mt-8 bg-white p-6 rounded-md shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Recent Income/Expenses</h2>
          <div className="table-container scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4">Date</th>
                  <th className="border p-4">Description</th>
                  <th className="border p-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    className="hover:bg-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: transaction.id * 0.1 }}
                  >
                    <td className="border p-4">{transaction.date}</td>
                    <td className="border p-4">{transaction.description}</td>
                    <td className={`border p-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to='/addtransaction'>
            <motion.button
              className="border rounded-md py-2 px-8 mt-4 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Transaction
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="flex-1 mt-8 bg-white p-6 rounded-md shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">My Expences</h2>
          <motion.div
            className="h-64 flex items-center justify-center bg-gray-100 rounded-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PieChart data={data} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
