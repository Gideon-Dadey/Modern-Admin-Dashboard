import React from 'react';
import LoadingIndicator from '../../common/LoadingIndicator';
import { useNavigate } from 'react-router-dom';

const SummaryCard = ({
  total,
  label,
  loading,
  destination,
}: {
  total: number;
  label: string;
  loading: boolean;
  destination: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className='bg-white border border-[#DFDFDF] py-6 px-[28px] rounded-md cursor-pointer'
      style={{
        boxShadow: '0px 0px 5.422535419464111px 0px rgba(0, 0, 0, 0.05)',
      }}
      onClick={() => navigate(destination)}
    >
      <div className='flex flex-col gap-[13px]'>
        <div className='flex items-center justify-between'>
          <span className='text-[#B7B7B7] text-sm'>Label</span>
          <span className='text-[#B7B7B7] text-sm'>
            {new Date().toLocaleDateString()}
          </span>
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <span className='text-2xl font-extrabold'>{total.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
