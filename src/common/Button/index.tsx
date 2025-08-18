import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

const Button = ({
  children,
  loading = false,
  className = '',
  type = 'button',
  ...rest
}: { loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={
        'bg-primary text-white h-[52px] p-5 rounded-[8px] w-full font-medium text-md flex items-center justify-center hover:bg-primaryDark duration-300 ' +
        className
      }
      type={type}
      style={{
        backgroundColor: rest.disabled || loading ? '#B0B0B0' : '#0057FF',
      }}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading ? <LoadingIndicator /> : children}
    </button>
  );
};

export default Button;
