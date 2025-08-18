import React from 'react';
import FullStarIcon from './full-star.svg';
import HalfStarIcon from './half-star.svg';

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex items-center gap-[15px]'>
      {/* Full */}
      {Array.from({ length: Math.floor(rating) }, (_, i) => i + 1).map((item) => (
        <img src={FullStarIcon} alt='Full star' key={item} />
      ))}
      {/* Half */}
      {rating - Math.floor(rating) !== 0 && <img src={HalfStarIcon} alt='Half star' />}
      {/* No empty */}
    </div>
  );
};

export default Rating;
