import React from 'react';

type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      className='font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 hover:dark:bg-blue-400 text-white transition-all'
      {...props}
    >
      {props.children}
    </button>
  );
};
