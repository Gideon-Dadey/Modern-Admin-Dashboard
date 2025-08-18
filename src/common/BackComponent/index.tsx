import React from 'react';
import ArrowLeftImage from '../../assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';

const BackComponent = ({
  containerClass,
  text = 'Back',
  destination,
}: {
  containerClass?: string;
  text?: string;
  destination: string;
}) => {
  return (
    <div className={containerClass}>
      <Link to={destination} className='flex items-center gap-2 \'>
        <img src={ArrowLeftImage} alt='Back' className='h-5' />
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default BackComponent;
