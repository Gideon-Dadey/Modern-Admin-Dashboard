import React from 'react';
import SuccessIcon from '../../assets/icons/success.svg';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const AuthSuccess = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <img src={SuccessIcon} alt='Success' />
      <h1 className='mt-5 mb-[70px] text-[30px] lg:text-[40px] text-center text-primary font-bold'>
        Success !
      </h1>
      <Link to='/auth/login' className='w-full'>
        <Button className='!w-full'>Continue to Login</Button>
      </Link>
    </div>
  );
};

export default AuthSuccess;
