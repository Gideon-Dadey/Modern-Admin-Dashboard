import React from 'react';
import { Link } from 'react-router-dom';

const Activity = () => {
  return (
    <div>
      <h2 className='font-bold text-xl mb-[18px]'>Recent Activity</h2>
      <div className='w-full bg-white flex flex-col gap-[28px] py-3'>
        <div className='bg-white flex flex-col px-12 relative'>
          {/* Border */}
          <aside
            className='w-[6px] absolute top-0 bottom-0 left-0 bg-[#008000]'
            style={{
              borderRadius: '0px 4px 4px 0px',
            }}
          />
          <p className='font-bold text-lg'>Ticket created resolved </p>
          <p className='mb-[21px] font-normal mt-[10px]'>
            Tega Moses has a dispute with the artisan Jude mike
          </p>
          <Link to='/#' className='font-bold text-primary text-lg underline'>
            Join chat
          </Link>
        </div>
        <div className='bg-white flex flex-col px-12 relative'>
          {/* Border */}
          <aside
            className='w-[6px] absolute top-0 bottom-0 left-0 bg-[#CBCBCB]'
            style={{
              borderRadius: '0px 4px 4px 0px',
            }}
          />
          <p className='font-bold text-lg'>Dispute </p>
          <p className='mb-[21px] font-normal mt-[10px]'>
            Tega Moses has a dispute with the artisan Jude mike
          </p>
          <Link to='/#' className='font-bold text-[#0057FF99] text-lg underline'>
            Join chat
          </Link>
        </div>
        <div className='bg-white flex flex-col px-12 relative'>
          {/* Border */}
          <aside
            className='w-[6px] absolute top-0 bottom-0 left-0 bg-[#CBCBCB]'
            style={{
              borderRadius: '0px 4px 4px 0px',
            }}
          />
          <p className='font-bold text-lg'>Dispute resolved </p>
          <p className='mb-[21px] font-normal mt-[10px]'>
            Ann Micheal has a dispute with the artisan Joshua
          </p>
          <Link to='/#' className='font-bold text-[#0057FF99] text-lg underline'>
            Join chat
          </Link>
        </div>
        <div className='bg-white flex flex-col px-12 relative'>
          {/* Border */}
          <aside
            className='w-[6px] absolute top-0 bottom-0 left-0 bg-[#CBCBCB]'
            style={{
              borderRadius: '0px 4px 4px 0px',
            }}
          />
          <p className='font-bold text-lg'>Dispute </p>
          <p className='mb-[21px] font-normal mt-[10px]'>
            Tega Moses has a dispute with the artisan Jude mike
          </p>
          <Link to='/#' className='font-bold text-[#0057FF99] text-lg underline'>
            Join chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activity;
