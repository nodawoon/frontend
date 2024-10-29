"use client";

import React, { useState } from "react";

interface textInputProps {
  placeholder?: string;
  width: number;
  disabled?: boolean;
}

function TextInput({ placeholder = "이메일", width, disabled = false }: textInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative" style={{ width: `${width}%` }}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(inputValue !== "")}
        style={{ width: `${width}%` }}
        className={`border border-gray p-2 rounded-md outline-none focus:ring-1 focus:ring-primary transition-all z-10 mt-2`}
        disabled={disabled}
      />
      <label
        className={`absolute left-2 px-1 text-sm mt-1 text-gray bg-white transition-all duration-300 ease-in-out pointer-events-none
          ${
            isFocused || inputValue
              ? "-top-2.5 left-2 text-xs text-primary z-20" // 위로 이동
              : "top-2 left-2 text-base text-gray-500"
          }`} // 기본 위치
      >
        {placeholder}
      </label>
    </div>
  );
}

export default TextInput;
