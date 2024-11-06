"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import survey from "../../public/survey.json";
import Image from "next/image";
import { loadRespondentList } from "@/slice/respondentsSlice";
import StatisticsCard from "@/components/results/StatisticsCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";

const Page: React.FC = () => {
  const surveyList: ReactNode[] = [];
  const combinedClassName: string = "h-auto border border-gray rounded-xl p-1 max-w-[30%] grow";
  const router = useRouter();
  // 기본 6개, show 활성화 시 전부 보여주기
  const nextPage = (e: number): undefined => {
    if (e === -1) {
      router.push("/results/respondents");
    } else {
      router.push("/results/questions/" + e);
    }
  };

  const { list } = useAppSelector(state => state.respondents);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentList());
      await dispatch(loadUser());
    })();
  }, [dispatch]);

  // survey 목록 불러오기
  survey.questions.forEach((e, index) => {
    surveyList.push(
      <div
        key={index}
        className="flex rounded-md my-2 w-full h-16 mx-auto bg-white pl-4 pr-6 hover:bg-gray"
        onClick={() => {
          nextPage(e.id);
        }}
      >
        <p className="flex self-center truncate text-[18px]">
          <span className="mr-3">{e.emoji}</span>
          <span className="truncate">{(index !== 9 ? user.nickname : "") + e.question}</span>
        </p>
      </div>
    );
  });
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full">내 질문에 응답한 사람들</p>
        <div className="relative flex flex-wrap gap-3">
          {list[0]?.respondentNickname === undefined ? (
            <div className="text-gray mb-5">아직 응답자가 없어요...</div>
          ) : list.length < 4 ? (
            <div className="absolute top-[10%] bg-gradient-to-t from-white w-full h-[100px]"></div>
          ) : (
            <div className="absolute bottom-[-10px] bg-gradient-to-t from-white w-full h-[130px]"></div>
          )}
          {list.map((e, index) => {
            if (e.respondentNickname === undefined) return;
            if (index < 6)
              return (
                <Image
                  key={index}
                  src="/character.svg"
                  alt="로고이미지"
                  width="100"
                  height="100"
                  className={combinedClassName}
                  priority
                />
              );
          })}
        </div>
        {list[0]?.respondentNickname !== undefined && (
          <Button
            onClick={() => {
              nextPage(-1);
            }}
            size="md"
            className="mx-auto my-5"
          >
            더보기
          </Button>
        )}
      </div>
      <div className="bg-light-gray w-full py-5">
        <div className="flex flex-col w-[85%] mx-auto">
          <p className="text-[22px] bold my-1">{user.nickname}님에 대해 알아보세요!</p>
          {surveyList}
        </div>
      </div>
      <div className="bg-white w-full flex flex-col gap-7 mt-8 mb-14">
        <StatisticsCard type="first" />
        <StatisticsCard type="keyword" />
        <StatisticsCard type="time" />
      </div>
    </div>
  );
};

export default Page;
