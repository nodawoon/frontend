"use client";

import { ReactNode } from "react";
import { Size } from "../../types/common";

interface ButtonProps {
  type?: "submit" | undefined;
  size: Size;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  option?: string;
  disabled?: boolean;
}

function Button({
  type,
  size,
  className,
  onClick,
  children,
  option = "primary",
  disabled = false,
}: ButtonProps) {
  let combinedClassName = "";

  switch (option) {
    case "primary": {
      combinedClassName +=
        "text-white bg-primary border border-primary hover:bg-primary-active font-bold break-words rounded-xl ";
      break;
    }
    case "secondary": {
      combinedClassName +=
        "text-primary bg-white border border-primary hover:bg-primary hover:text-white font-bold break-words rounded-xl ";
      break;
    }
    default: {
      break;
    }
  }

  switch (size) {
    case "sm": {
      combinedClassName += "py-2 px-6 text-sm";
      break;
    }
    case "md": {
      combinedClassName += "py-2.5 px-12 text-sm";
      break;
    }
    case "lg": {
      combinedClassName += "py-3 px-24 text-base";
      break;
    }
  }

  return (
    <button
      type={type ? type : "button"}
      className={`${combinedClassName} ${className} ${disabled ? "bg-gray border border-gray" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
