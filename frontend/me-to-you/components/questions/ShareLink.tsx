"use client";

import Image from "next/image";
import React from "react";

interface shareProps {
  handleKakaoShare: () => void;
  handleUrlShare: () => void;
  handleQRShare: () => void;
}

const ShareLink = ({ handleKakaoShare, handleUrlShare, handleQRShare }: shareProps) => {
  return (
    <div className="text-center">
      <p>설문이 생성되었어요! 지인들에게 공유해보세요:{")"}</p>
      <div className="flex justify-center py-4">
        <button className="mr-2" onClick={handleKakaoShare}>
          <Image
            src="/share/kakao.svg"
            alt="카카오톡"
            width="50"
            height="50"
            className="border border-light-gray"
          />
          <p className="text-sm">카카오톡</p>
        </button>
        <button className="ml-2 mr-2" onClick={handleUrlShare}>
          <div className="border-4 border-light-gray rounded-full bg-white flex items-center justify-center w-[50px] h-[50px]">
            <Image src="/share/url.svg" alt="url" width={30} height={12} />
          </div>
          <p className="text-sm">링크복사</p>
        </button>
        <button className="ml-2" onClick={handleQRShare}>
          <div className="border-4 border-light-gray rounded-full bg-white flex p-2 w-[50px] h-[50px]">
            <Image
              src="/share/qr_code.svg"
              alt="url"
              width={20}
              height={12}
              className="ml-auto mr-auto"
            />
          </div>
          <p className="text-sm">QR</p>
        </button>
      </div>
    </div>
  );
};

export default ShareLink;
