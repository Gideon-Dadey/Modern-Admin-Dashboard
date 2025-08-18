import React from 'react';

interface Props {
  title: string;
  pageActions?: React.ReactNode;
}

function PageHeader({ title, pageActions }: Props) {
  return (
    <div className='flex items-center justify-between mb-[60px]'>
      <h1 className='font-bold text-2xl'>{title}</h1>
      {pageActions}
    </div>
  );
}

export default PageHeader;
