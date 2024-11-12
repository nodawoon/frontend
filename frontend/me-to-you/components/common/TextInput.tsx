"use client";

import React, { ChangeEventHandler, useState } from "react";

interface textInputProps {
  placeholder?: string;
  value?: string;
  validationMessage?: string;
  handleChangeInput?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  maxLength?: number;
}

function TextInput({
  placeholder = "이메일",
  value = "",
  validationMessage,
  handleChangeInput,
  disabled = false,
  maxLength = 10,
}: textInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // 포커스가 없고 값이 없을 때만 라벨을 표시
  const shouldShowLabel = isFocused || value === "";

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleChangeInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`h-10 w-full border border-gray p-2 rounded-md outline-none focus:ring-1 focus:ring-primary transition-all`}
        disabled={disabled}
        maxLength={maxLength}
      />
      {shouldShowLabel && (
        <label
          className={`absolute left-2 px-1 text-sm bg-white transition-all duration-300 ease-in-out pointer-events-none
            ${isFocused ? "-top-2.5 text-xs text-primary" : "top-2 text-base text-gray-500"}
          `}
        >
          {placeholder}
        </label>
      )}
      {validationMessage && isFocused && (
        <span className="text-xs text-gray absolute -bottom-4 left-2">{validationMessage}</span>
      )}
    </div>
  );
}

export default TextInput;
