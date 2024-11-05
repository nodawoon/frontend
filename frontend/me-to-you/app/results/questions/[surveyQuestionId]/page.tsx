"use client";

import React, { useState, useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadRespondentQuestionList } from "@/slice/respondentsSlice";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import ResultCard from "@/components/results/ResultCard";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const param = useParams();
  const router = useRouter();

  const { list } = useSelector((state: RootState) => state.respondentsQuestion);
  const { nickname } = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentQuestionList(param.surveyQuestionId));
    })();
  }, [dispatch, param.surveyQuestionId]);

  const [isTruncate, setIsTruncate] = useState(-1);
  if (Number(param.surveyQuestionId) < 1 || Number(param.surveyQuestionId) > 10) {
    router.push("/results");
    return;
  }

  const currentSurvey = survey.questions[Number(param.surveyQuestionId) - 1];
  const question: string = currentSurvey.emoji + " " + name + currentSurvey.question;

  // const profileList: { name: string; response: string | string[]; date: string }[] = [
  //   {
  //     name: "김싸피",
  //     response:
  //       "친근하고 좋았다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
  //     date: "2024.10.17",
  //   },
  //   {
  //     name: "이싸피",
  //     response:
  //       "친구 하고 싶다kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkㅏㅏㅏk",
  //     date: "2024.10.24",
  //   },
  //   {
  //     name: "박싸피",
  //     response: "어색했다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
  //     date: "2024.10.25",
  //   },
  //   { name: "서싸피", response: ["다가가", "asd", "bsa"], date: "2024.10.30" },
  // ];

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-light-gray">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full font-bold">{nickname + question}</p>
        <div className="relative flex flex-wrap gap-3">
          {list.map((e, index) => {
            if (e.createdDate === "") return;
            return (
              <ResultCard
                key={index}
                name={e.respondentNickname}
                text={e.response}
                date={e.createdDate}
                flow={isTruncate === index ? "break-all" : "truncate"}
                onClick={() => (isTruncate === index ? setIsTruncate(-1) : setIsTruncate(index))}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
