import { ReactNode } from "react";
import { Size } from "@/types/common";

// 나중에 여기 값만 바꾸면, 크기 변경 가능함!
const Size_Info = {
  sm: "py-1 px-4 text-sm",
  md: "py-1 px-12 text-sm",
  lg: "py-1 px-20 text-base",
};

interface SelectButtonProps {
  size?: Size;
  isSelected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const SelectButton = ({
  size = "md",
  isSelected = false,
  onClick,
  children,
  disabled = false,
}: SelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full font-bold border rounded-lg mt-2 ${
        isSelected ? "border-2 border-primary bg-sub-sky text-black" : "border-1 border-gray"
      } ${Size_Info[size]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SelectButton;
