import Transactio_img from './../../assets/transaction.png';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const incomeCategories = [
  { value: 'salary', label: 'Salary' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'investment', label: 'Investment' },
];

const expenseCategories = [
  { value: 'rent', label: 'Rent' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
];

function AddTransaction() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);

  const categoryOptions = transactionType === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-[60rem] bg-white rounded-lg shadow-lg p-6 flex border border-gray-200'>
        <div className='w-1/2 p-4'>
          <img src={Transactio_img} alt="Transaction image" className='w-full h-auto rounded-lg object-cover' />
        </div>
        <div className='w-1/2 p-4'>
          <form onSubmit={handleSubmit} >
            <div className='mb-4'>
              <label htmlFor="amount" className='block text-sm font-medium text-gray-700 mb-1'>
                Amount <br />
                <span className='text-xs text-gray-500'>(negative - expense, positive - income)</span>
              </label>
              <input
                type="number"
                placeholder="Enter amount..."
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-gray-700'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="date" className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date as Date)}
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded'
              />
            </div>
             <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Transaction Type</label>
            <div className='flex items-center space-x-3'>
              <label className='flex items-center'>
                <input
                  type="radio"
                  value="income"
                  checked={transactionType === 'income'}
                  onChange={() => setTransactionType('income')}
                  className='text-blue-500 focus:ring-blue-500'
                />
                <span className='ml-2 text-sm text-gray-700'>Income</span>
              </label>
              <label className='flex items-center'>
                <input
                  type="radio"
                  value="expense"
                  checked={transactionType === 'expense'}
                  onChange={() => setTransactionType('expense')}
                  className='text-blue-500 focus:ring-blue-500'
                />
                <span className='ml-2 text-sm text-gray-700'>Expense</span>
              </label>
            </div>
          </div>
            <div className='mb-4'>
              <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={(newValue) => setSelectedCategory(newValue as { value: string; label: string } | null)}
                placeholder="Select category"
                className='text-sm'
              />
            </div>
            <button type="submit" className='w-full border rounded-md py-2 px-4 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md'>
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
