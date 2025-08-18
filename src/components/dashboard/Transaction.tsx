import React from 'react';
import { Link } from 'react-router-dom';
import NoTransactionIcon from '../../assets/images/home/transaction.svg';

const Transaction = () => {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex items-center justify-between mb-[18px]'>
        <h2 className='font-bold text-xl'>Recent Transaction</h2>
        <Link to='/#' className='text-primary underline'>
          View all
        </Link>
      </div>
      <div className='flex justify-center items-center bg-white w-full min-h-[400px] flex-grow'>
        <img src={NoTransactionIcon} alt='No Transaction' />
      </div>
    </div>
  );
};

export default Transaction;
