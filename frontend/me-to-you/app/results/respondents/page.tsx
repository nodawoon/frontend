"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const profileList: { key: number; value: string }[] = [
    { key: 1, value: "김싸피" },
    { key: 2, value: "김싸피" },
    { key: 3, value: "김싸피" },
    { key: 4, value: "김싸피" },
    { key: 5, value: "김싸피" },
    { key: 6, value: "김싸피" },
    { key: 7, value: "김싸피" },
    { key: 8, value: "김싸피" },
  ];
  const combinedClassName: string = "h-auto rounded-xl p-1 bg-white hover:bg-gray w-full";

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-light-gray">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full">내 질문에 응답한 사람들</p>
        <div className="relative flex flex-wrap gap-3">
          {profileList.map((e, index) => {
            return (
              <>
                <div className="flex flex-col grow max-w-[30%]">
                  <Image
                    key={index}
                    src="/character.svg"
                    alt="로고이미지"
                    width="100"
                    height="100"
                    className={combinedClassName}
                    onClick={() => router.push("respondents/" + e.key)}
                    priority
                  />
                  <span className="text-center w-full">{e.value}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
