"use client";

import { useState } from 'react';
import { Size } from '@/types/common';

//나중에 여기 값만 바꾸면, 크기 변경 가능함!
const Size_Info = {
  sm: "py-1 px-4 text-sm",
  md: "py-1 px-12 text-sm",
  lg: "py-1 px-20 text-base",
}

interface SelecteButtonProps {
  size?: Size;
}

function SelectButton({ size = "md" }: SelecteButtonProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className='p-6'>
      <button onClick={() => setIsSelected(!isSelected)}
        className={`font-bold border rounded-lg ${isSelected ? "border-2 border-primary bg-sub-sky text-black" : "border-1 border-gray"} ${Size_Info[size]}`}>
        선택 버튼
      </button>
    </div>
  )
}

export default SelectButton;