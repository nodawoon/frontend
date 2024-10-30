"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import survey from "../../public/survey.json";
import Image from "next/image";

const Page: React.FC = () => {
  const profileList: number[] = [1, 2, 3, 4, 5, 6];
  const surveyList: ReactNode[] = [];
  const name: string = "김싸피";
  const combinedClassName: string = "h-auto border border-gray rounded-xl p-1 hover:bg-light-gray";
  const router = useRouter();

  // 기본 6개, show 활성화 시 전부 보여주기
  const nextPage = (e: number): undefined => {
    if (e === 1) {
      router.push("/results/profiles");
    } else if (e === 2) {
      router.push("/results/questions");
    }
  };

  // survey 목록 불러오기
  survey.questions.forEach((e, index) => {
    surveyList.push(
      <div
        key={index}
        className="flex rounded-md my-2 w-full h-16 mx-auto bg-white pl-4 pr-6 hover:bg-gray"
        onClick={() => {
          nextPage(2);
        }}
      >
        <p className="flex self-center truncate text-[18px]">
          <span className="mr-3">😊</span>
          <span className="truncate">{e.question}</span>
        </p>
      </div>
    );
  });

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full">내 질문에 응답한 사람들</p>
        <div className="flex flex-wrap justify-between gap-y-3">
          {profileList.map((e, index) => {
            if (index < 6)
              return (
                <Image
                  key={index}
                  src="/character.svg"
                  alt="로고이미지"
                  width="110"
                  height="110"
                  className={combinedClassName}
                  priority
                />
              );
          })}
        </div>
        <Button
          onClick={() => {
            nextPage(1);
          }}
          size="md"
          className="mx-auto my-5"
        >
          더보기
        </Button>
      </div>
      <div className="bg-light-gray w-full py-5">
        <div className="flex flex-col w-[85%] mx-auto">
          <p className="text-[22px] bold my-1">{name}님에 대해 알아보세요!</p>
          {surveyList}
        </div>
      </div>
    </div>
  );
};

export default Page;
