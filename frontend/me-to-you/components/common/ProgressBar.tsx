import React from "react";

interface progressProps {
  progress: number;
  width: number;
  className?: string;
  questionNum?: number;
}

function ProgressBar({ progress, width, className, questionNum = 10 }: progressProps) {
  const currentQuestion = (progress / 100) * questionNum;

  return (
    <div
      className={`w-[${width}%] h-6 border border-soft-gray bg-white rounded-full relative ml-auto mr-auto ${className}`}
    >
      <div
        className="bg-sub-sky rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%`, height: "100%" }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center font-regular text-base font-bold"
        style={{ lineHeight: "1.5rem" }}
      >
        {currentQuestion.toFixed(0)} &nbsp;/&nbsp; {questionNum}
      </div>
    </div>
  );
}

export default ProgressBar;
