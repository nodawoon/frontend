"use client";

import React, { useState, useEffect } from "react";
import { loadRespondentQuestionList } from "@/slice/respondentsSlice";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import ResultCard from "@/components/results/ResultCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";

const Page: React.FC = () => {
  const param = useParams();

  const { list } = useAppSelector(state => state.respondentsQuestion);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentQuestionList(param.surveyQuestionId));
      await dispatch(loadUser());
    })();
  }, [dispatch]);

  const [isTruncate, setIsTruncate] = useState(-1);
  if (
    Number(param.surveyQuestionId) < 1 ||
    Number(param.surveyQuestionId) > 10 ||
    Number.isNaN(Number(param.surveyQuestionId))
  ) {
    window.history.back();
    return;
  }

  const currentSurvey = survey.questions[Number(param.surveyQuestionId) - 1];
  const question: string =
    currentSurvey.emoji +
    " " +
    (Number(param.surveyQuestionId) !== 10 ? user.nickname : "") +
    currentSurvey.question;

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[92vh] bg-white">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full font-bold">{question}</p>
        <div className="flex flex-wrap gap-3 pb-20 z-10">
          {list[0]?.respondentNickname === undefined ? (
            <div className="text-gray mb-5 text-lg">아직 응답자가 없어요...</div>
          ) : (
            list.map(
              (
                e: { respondentNickname: string; createdDate: string; response: string },
                index: number
              ) => {
                if (e.respondentNickname === undefined) return;
                return (
                  <ResultCard
                    key={index}
                    name={e.respondentNickname !== "" ? e.respondentNickname : "익명"}
                    text={e.response}
                    date={e.createdDate}
                    flow={isTruncate === index ? "break-all" : "truncate"}
                    questionNumber={Number(param.surveyQuestionId)}
                    onClick={() =>
                      isTruncate === index ? setIsTruncate(-1) : setIsTruncate(index)
                    }
                  />
                );
              }
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
