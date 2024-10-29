import React from "react";

interface progressProps {
  progress: number;
  width: number;
}

//progress는 사용하는 함수에서 직접 증가량을 입력해주시면 그대로 찰겁니다!! (총 질문 20개면 += 5 식으로)
function ProgressBar({ progress, width }: progressProps) {
  return (
    //원하는 크기에 맞춰 전달, 프로그레스바는 자동으로 가운데 정렬 시켜둠
    <div
      className={`w-[${width}%] border border-soft-gray bg-white rounded-full h-2 ml-auto mr-auto`}
    >
      <div
        className="bg-sub-sky rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%`, height: "100%" }}
      ></div>
    </div>
  );
}

export default ProgressBar;
