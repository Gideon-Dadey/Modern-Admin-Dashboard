import Navbar from './Navbar/Navbar';
import React from 'react';
import Sidebar from './Sidebar/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-h-screen h-full'>
      <div className='flex flex-row flex-nowrap'>
        <Sidebar />
        <main className='w-full bg-[#F6F7F9] overflow-auto'>
          <Navbar />
          <div className='pl-6 pr-6 pt-[25px] pb-[25px] min-h-main'>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
