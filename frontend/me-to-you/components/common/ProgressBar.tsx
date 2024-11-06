import React from "react";

interface progressProps {
  progress: number;
  width: number;
  className?: string;
}

function ProgressBar({ progress, width, className }: progressProps) {
  return (
    <div
      className={`w-[${width}%] h-6 border border-soft-gray bg-white rounded-full ml-auto mr-auto ${className}`}
    >
      <div
        className={`bg-sub-sky flex justify-center items-center rounded-full transition-all duration-500 ease-in-out text-center font-regular ${progress / 10 === 1 ? "text-sm" : "text-base"}`}
        style={{ width: `${progress}%`, height: "100%" }}
      >
        {progress / 10} / {width / 10}
      </div>
    </div>
  );
}

export default ProgressBar;
