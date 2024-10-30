"use client";

import React, { ChangeEventHandler, useState } from "react";

interface textInputProps {
  placeholder?: string;
  value?: string;
  validationMessage?: string;
  handleChangeInput?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

function TextInput({
  placeholder = "이메일",
  value = "",
  validationMessage,
  handleChangeInput,
  disabled = false,
}: textInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleChangeInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== "")}
        className={`h-10 w-full border border-gray p-2 rounded-md outline-none focus:ring-1 focus:ring-primary transition-all z-10`}
        disabled={disabled}
      />
      <label
        className={`absolute left-2 px-1 text-sm mt-1 text-gray bg-white transition-all duration-300 ease-in-out pointer-events-none
          ${
            isFocused || value
              ? "-top-2.5 left-2 text-xs text-primary z-20" // 위로 이동
              : "top-2 left-2 text-base text-gray-500"
          }`} // 기본 위치
      >
        {placeholder}
      </label>
      <span className="text-xs text-gray absolute -bottom-4 left-2">
        {isFocused && validationMessage}
      </span>
    </div>
  );
}

export default TextInput;
