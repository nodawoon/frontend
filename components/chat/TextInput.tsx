import React, { ChangeEventHandler, useEffect, useRef } from "react";

interface TextInputProps {
  value: string;
  placeholder: string;
  handleChangeInput: ChangeEventHandler<HTMLInputElement>;
  handleClickEnter: () => void;
  disabled?: boolean;
  maxLength?: number;
}

function TextInput({
  value = "",
  placeholder,
  handleChangeInput,
  handleClickEnter,
  disabled = false,
  maxLength = 100,
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickEnter();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChangeInput}
      className={`w-full h-full p-3 text-sm rounded-md outline-none transition-all z-10 mt-3 ${
        disabled && "border border-gray"
      }`}
      disabled={disabled}
      maxLength={maxLength}
      onKeyDown={handleKeyDown}
    />
  );
}

export default TextInput;
