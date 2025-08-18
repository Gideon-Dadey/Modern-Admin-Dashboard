import React from 'react';

const Checkbox = ({
  className,
  id,
  label,
  ...rest
}: { className?: string; id: string } & React.HTMLProps<HTMLInputElement>) => {
  return (
    <div className={'flex items-center ' + className}>
      <input
        id={id}
        type='checkbox'
        value=''
        className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2'
        {...rest}
      />
      <label htmlFor={id} className='ml-2 font-medium text-gray-900'>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
