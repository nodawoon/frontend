"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import survey from "../../public/survey.json";
import { loadRespondentList } from "@/slice/respondentsSlice";
import StatisticsCard from "@/components/results/StatisticsCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";

const Page: React.FC = () => {
  const surveyList: ReactNode[] = [];
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
    if (index > 9) return;
    surveyList.push(
      <div
        key={index}
        className="flex rounded-md my-2 w-full h-16 mx-auto bg-white pl-4 pr-6 hover:bg-[#f0f0f0] cursor-pointer"
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
    <div className="w-full bg-light-gray flex flex-col items-center justify-center min-h-[92vh]">
      <div className="w-full flex flex-col gap-7 mt-8 mb-14">
        <StatisticsCard type="first" userNickname={user.nickname} />
        <StatisticsCard type="keyword" userNickname={user.nickname} />
        <StatisticsCard type="time" userNickname={user.nickname} />
      </div>
      <div className="w-full bg-light-gray">
        <div className="flex flex-col w-[85%] bg-light-gray mx-auto">
          <p className="text-[20px] mt-10 mb-5 w-full">
            나의 설문에 응답한 사람{" "}
            <span className="text-primary ">
              {list[0]?.respondentNickname === undefined ? 0 : list?.length}{" "}
            </span>
            명
          </p>
          <div className="relative flex flex-wrap gap-3">
            {list[0]?.respondentNickname === undefined ? (
              <div className="text-gray mb-5">아직 응답자가 없어요...</div>
            ) : (
              <button
                className="bg-white w-full h-14 rounded-md mb-10 hover:bg-[#f0f0f0]"
                onClick={() => {
                  router.push("results/respondents");
                }}
              >
                <p className="flex justify-between px-5">
                  <span className="text-[20px]">응답자별 결과 보기</span>
                  <span className="self-center material-symbols-rounded text-icon">
                    arrow_forward_ios
                  </span>
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-light-gray w-full py-5">
        <div className="flex flex-col w-[85%] mx-auto">
          <p className="text-[20px] my-1 xs-mobile:text-lg">
            사람들은 {user.nickname}님을 어떻게 생각할까요?
          </p>
          <p className="text-medium-gray font-light text-sm mb-4 xs-mobile:text-xs">
            질문을 클릭하면 질문별로 응답을 확인할 수 있어요!
          </p>
          {surveyList}
        </div>
      </div>
    </div>
  );
};

export default Page;
