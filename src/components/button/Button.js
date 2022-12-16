import React from 'react';

const Button = ({
  onClick,
  className,
  type = 'button',
  bgColor = 'primary',
  children,
  full = false,
}) => {
  let bgClassName = 'bg-primary';
  switch (bgColor) {
    case 'primary': {
      bgClassName = 'bg-primary';
      break;
    }
    case 'secondary': {
      bgClassName = 'bg-secondary';
      break;
    }

    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 rounded-lg capitalize mt-auto ${bgClassName} 
      ${full ? 'w-full' : ''}  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
