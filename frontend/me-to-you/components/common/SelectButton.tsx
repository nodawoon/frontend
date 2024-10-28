"use client";

import { useState } from 'react';
import { Size } from '@/types/common';

// 나중에 여기 값만 바꾸면, 크기 변경 가능함!
const Size_Info = {
  sm: "py-1 px-4 text-sm",
  md: "py-1 px-12 text-sm",
  lg: "py-1 px-20 text-base",
}

interface SelecteButtonProps {
  size?: Size;
  type?: string;
  amount?: number;
  maximum?: number; // 최대 선택 가능 개수
}

function SelectButton({ size = "md", type = "single", amount = 1, maximum = 1 }: SelecteButtonProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]); // 선택된 버튼의 인덱스를 저장

  const handleSingleSelect = (index: number) => {
    // single 모드에서는 하나만 선택 가능하므로, 선택된 인덱스를 하나만 저장
    setSelectedIndexes([index]);
  };

  const handleMultipleSelect = (index: number) => {
    // 이미 선택된 버튼을 클릭한 경우 해제
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter(i => i !== index));
    }
    // 선택되지 않은 버튼을 클릭한 경우 최대값 이하에서만 추가 선택 가능
    else if (selectedIndexes.length < maximum) {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  return (
    <div className="p-6">
      {type === "single" ? (
        // single 모드: 하나만 선택 가능
        <div className="flex space-x-2">
          {Array.from({ length: amount }, (_, index) => (
            <button
              key={index}
              onClick={() => handleSingleSelect(index)}
              className={`font-bold border rounded-lg ${selectedIndexes.includes(index)
                ? "border-2 border-primary bg-sub-sky text-black"
                : "border-1 border-gray"} ${Size_Info[size]}`}
            >
              선택 버튼 {index + 1}
            </button>
          ))}
        </div>
      ) : type === "multiple" ? (
        // multiple 모드: 여러 개 선택 가능, 최대 선택 개수 제한
        <div className="flex space-x-2">
          {Array.from({ length: amount }, (_, index) => (
            <button
              key={index}
              onClick={() => handleMultipleSelect(index)}
              className={`font-bold border rounded-lg ${selectedIndexes.includes(index)
                ? "border-2 border-primary bg-sub-sky text-black"
                : "border-1 border-gray"} ${Size_Info[size]}`}
            >
              선택 버튼 {index + 1}
            </button>
          ))}
        </div>
      ) : (
        <p>알 수 없는 양식</p>
      )}
    </div>
  );
}

export default SelectButton;
