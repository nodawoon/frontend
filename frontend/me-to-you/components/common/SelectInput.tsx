"use client";
import React from "react";

interface SelectBoxProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
}

const SelectInput: React.FC<SelectBoxProps> = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-white rounded-[10px] border border-gray text-dark-gray">
      <div className={`flex justify-between items-center p-3 ${isOpen && "border-b border-gray"}`}>
        <p className="text-xl">{selectedOption ? selectedOption : "선택"}</p>
        {isOpen ? (
          <span
            className="material-symbols-rounded text-primary text-icon"
            onClick={handleClickOpen}
          >
            keyboard_arrow_up
          </span>
        ) : (
          <span className="material-symbols-rounded text-icon" onClick={handleClickOpen}>
            keyboard_arrow_down
          </span>
        )}
      </div>
      {isOpen &&
        options.map((option, idx) => (
          <div
            key={idx}
            className="p-3 border-b border-gray hover:bg-sub-sky"
            onClick={() => {
              setSelectedOption(option);
              handleClickOpen();
            }}
          >
            <span className="text-xl">{option}</span>
          </div>
        ))}
    </div>
  );
};

export default SelectInput;
