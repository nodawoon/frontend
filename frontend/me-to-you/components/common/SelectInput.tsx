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
    <div className="relative w-full bg-white z-20 h-10">
      <div
        className={`p-2 flex justify-between items-center border border-gray ${isOpen ? "rounded-t-md rounded-b-none" : "rounded-md"}`}
      >
        <p>{selectedOption ? selectedOption : "선택"}</p>
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
      {isOpen && (
        <ul className="absolute w-full bg-white border border-t-0 border-gray rounded-b-md box-border">
          {options.map((option, index) => (
            <li
              key={option}
              className={`p-2 flex items-center ${index !== options.length - 1 ? "border-b" : ""} border-gray
                ${selectedOption === option ? "text-black" : "text-dark-gray"} hover:bg-sub-sky`}
              onClick={() => {
                setSelectedOption(option);
                handleClickOpen();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
