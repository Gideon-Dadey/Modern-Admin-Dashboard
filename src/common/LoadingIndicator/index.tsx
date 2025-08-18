import React from 'react';
import styles from './style.module.css';

const LoadingIndicator = ({ text, size = 30 }: { text?: string; size?: number }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.loader}
        style={{
          height: size,
          width: size,
        }}
      ></div>
      {text && <span>{text}</span>}
    </div>
  );
};

export default LoadingIndicator;
