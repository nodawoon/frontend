"use client";

import React, { useState, useEffect } from "react";
import { loadRespondentQuestionList } from "@/slice/respondentsSlice";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import ResultCard from "@/components/results/ResultCard";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";

const Page: React.FC = () => {
  const param = useParams();
  const router = useRouter();

  const { list } = useAppSelector(state => state.respondentsQuestion);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentQuestionList(param.surveyQuestionId));
      await dispatch(loadUser());
    })();
  }, [dispatch, param.surveyQuestionId, user]);

  const [isTruncate, setIsTruncate] = useState(-1);
  if (Number(param.surveyQuestionId) < 1 || Number(param.surveyQuestionId) > 10) {
    router.push("/results");
    return;
  }

  const currentSurvey = survey.questions[Number(param.surveyQuestionId) - 1];
  const question: string =
    currentSurvey.emoji +
    " " +
    (Number(param.surveyQuestionId) !== 10 ? user.nickname : "") +
    currentSurvey.question;

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-light-gray">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full font-bold">{question}</p>
        <div className="flex flex-wrap gap-3">
          {list.map((e, index) => {
            if (e.respondentNickname === undefined) return;
            return (
              <ResultCard
                key={index}
                name={e.respondentNickname !== "" ? e.respondentNickname : "익명"}
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
