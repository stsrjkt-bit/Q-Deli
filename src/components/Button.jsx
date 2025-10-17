import React from 'react';
import clsx from 'clsx';

export default function Button({ children, className, variant = 'primary', ...props }){
  return (
    <button
      className={clsx('button', className, {
        'button--secondary': variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  );
}
