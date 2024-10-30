import { ReactNode } from "react";
import { Size } from "@/types/common";

// 나중에 여기 값만 바꾸면, 크기 변경 가능함!
const Size_Info = {
  sm: "py-1 px-2 text-sm",
  md: "py-1 px-4 text-sm",
  lg: "py-1 px-6 text-base",
};

interface SelectButtonProps {
  size?: Size;
  isSelected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const SelectButton = ({
  size = "md",
  isSelected = false,
  onClick,
  children,
  disabled = false,
  className,
}: SelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold border rounded-lg mt-2 ${
        isSelected ? "border-2 border-primary bg-sub-sky text-black" : "border-1 border-gray"
      } ${disabled ? "bg-light-gray" : ""} ${Size_Info[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SelectButton;
