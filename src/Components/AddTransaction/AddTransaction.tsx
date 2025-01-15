import Transactio_img from './../../assets/transaction.png';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useAuth } from '../../Hooks/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const incomeCategories = [
  { value: 'salary', label: 'Salary' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'interest', label: 'Interest' },
  { value: 'extra', label: 'Extra' },
];

const expenseCategories = [
  { value: 'rent', label: 'Rent' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'health', label: 'Health' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'education', label: 'Education' },
  { value: 'Internet', label: 'Internet' },
  { value: 'phone', label: 'Phone' },
  { value: 'travel', label: 'Travel' },
  { value: 'gifts', label: 'Gifts' },
  { value: 'donations', label: 'Donations' },
  { value: 'foods', label: 'Foods' },
  { value: 'others', label: 'Others' },
];

function AddTransaction() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [type, settype] = useState<'income' | 'expense'>('income');
  const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);
  const [amount, setAmount] = useState<number | string>('');
  const navigate = useNavigate();

  const { authState } = useAuth();
  const { userId } = authState;

  const categoryOptions = type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountValue = type === 'income' ? Number(amount) : -Math.abs(Number(amount)); // Handle amount based on transaction type

    if (isNaN(amountValue)) {
      alert('Please enter a valid amount');
      return;
    }

    try {
        axios.post('http://54.242.200.246/api/transaction/addtranaction', {
        userId,
        amount: amountValue,
        date: startDate,
        type,
        category: selectedCategory?.label,
      }); 
      toast.success('Transaction added successfully', { position: 'bottom-right', theme: 'colored' });
      setStartDate(new Date());
      settype('income');
      setSelectedCategory(null);
      setAmount('');
      navigate(`/dashboard/${userId}`);
    }
    catch (error) {
      //console.log(error);
      toast.error('An unexpected error occurred', { position: 'bottom-right', theme: 'colored' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[60rem] bg-white rounded-lg shadow-lg p-6 flex border border-gray-200">
        <div className="w-1/2 p-4">
          <img
            src={Transactio_img}
            alt="Transaction image"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-1/2 p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
                <br />
                <span className="text-xs text-gray-500">(Input positive values for income and negative values for expense)</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="income"
                    checked={type === 'income'}
                    onChange={() => settype('income')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Income</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="expense"
                    checked={type === 'expense'}
                    onChange={() => settype('expense')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Expense</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={(newValue) => setSelectedCategory(newValue as { value: string; label: string } | null)}
                placeholder="Select category"
                className="text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full border rounded-md py-2 px-4 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
