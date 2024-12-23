import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <Image
        src="/images/loading.gif"
        alt="로딩 중..."
        width="160"
        height="160"
        style={{ height: "auto" }}
        priority
        unoptimized
      />
    </div>
  );
};

export default Loading;
