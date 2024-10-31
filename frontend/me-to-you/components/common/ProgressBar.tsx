import React from "react";

interface progressProps {
  progress: number;
  width: number;
  className?: string;
}

function ProgressBar({ progress, width, className }: progressProps) {
  return (
    <div
      className={`w-[${width}%] border border-soft-gray bg-white rounded-full ml-auto mr-auto ${className}`}
    >
      <div
        className="bg-sub-sky rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%`, height: "100%" }}
      ></div>
    </div>
  );
}

export default ProgressBar;
