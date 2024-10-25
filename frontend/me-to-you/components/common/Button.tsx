"use client";

import { ReactNode } from 'react';
import { Size } from '../../types/common';

interface ButtonProps {
  type?: "submit" | undefined;
  size: Size;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

function Button({ type, size, className, onClick, children }: ButtonProps) {
  let combinedClassName = 'text-white bg-primary font-bold break-words rounded-xl hover:bg-primary-active ';

  switch (size) {
    case 'sm': {
      combinedClassName += 'py-2 px-6 text-sm';
      break;
    }
    case 'md': {
      combinedClassName += 'py-2.5 px-12 text-sm';
      break;
    }
    case 'lg': {
      combinedClassName += 'py-3 px-24 text-base';
      break;
    }
  }
  return (
    <button type={type ? type : 'button'} className={`${combinedClassName} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
