"use client";

import React from "react";

interface RadioProps {
  type?: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

function RadioButton({ type = "gender", selectedValue, onChange }: RadioProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (type === "gender") {
    return (
      <div className="h-10 flex space-x-6 justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="MAN"
            name="gender"
            checked={selectedValue === "MAN"}
            onChange={handleChange}
          />
          <label className="text-sm font-bold">남자</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="WOMAN"
            name="gender"
            checked={selectedValue === "WOMAN"}
            onChange={handleChange}
          />
          <label className="text-sm font-bold">여자</label>
        </div>
      </div>
    );
  } else if (type === "question_type") {
    return (
      <div className="flex space-x-6 justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="multiple_choice"
            name="question_type"
            checked={selectedValue === "multiple_choice"}
            onChange={handleChange}
          />
          <label className="text-sm font-bold">객관식</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="short_answer"
            name="question_type"
            checked={selectedValue === "short_answer"}
            onChange={handleChange}
          />
          <label className="text-sm font-bold">단답형</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="long_answer"
            name="question_type"
            checked={selectedValue === "long_answer"}
            onChange={handleChange}
          />
          <label className="text-sm font-bold">서술형</label>
        </div>
      </div>
    );
  } else {
    return <p>알 수 없는 양식</p>;
  }
}

export default RadioButton;
