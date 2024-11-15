"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import survey from "../../../../public/survey.json";
import ProfileCard from "@/components/results/respondents/ProfileCard";
import { loadRespondentDetail, loadRespondentList } from "@/slice/respondentsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";

const Page: React.FC = () => {
  const param = useParams();
  const [isCurrent, setIsCurrent] = useState(-1);
  const [isIndex, setIsIndex] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const list = [...useAppSelector(state => state.respondentDetail).list].sort(
    (a, b) => ((a.surveyQuestionId - 1) % 10) - ((b.surveyQuestionId - 1) % 10)
  );
  const { user } = useAppSelector(state => state.user);
  const resList = useAppSelector(state => state.respondents).list;

  useEffect(() => {
    (async () => {
      await dispatch(loadRespondentDetail(param.respondentId));
      await dispatch(loadUser());
      if (resList[0]?.respondentNickname === undefined) {
        await dispatch(loadRespondentList());
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    resList.forEach((e: { respondentId: number; respondentNickname: string }) => {
      if (e.respondentId === Number(param.respondentId) && e.respondentNickname !== undefined) {
        setIsIndex(true);
        setName(e.respondentNickname);
      }
    });
  }, [resList]);

  const questions = survey.questions;

  const flow = (i: number) => {
    return i === isCurrent ? "" : "truncate";
  };

  if (!isIndex) {
    return <div className="text-center mt-10 text-[30px]"></div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-[90%]">
        <ProfileCard className="mt-5 mb-7 w-full" name={name} date={list[0]?.createdDate} />
        <div className="relative flex flex-wrap gap-3 mb-10">
          {list?.map((e, index) => {
            return (
              <div
                key={index}
                className={"w-full " + flow(index)}
                onClick={() => (index === isCurrent ? setIsCurrent(-1) : setIsCurrent(index))}
              >
                <div className={"my-2 font-bold flex " + flow(index)}>
                  <span>{index + 1 + "."}</span>
                  <span className={"pl-1 " + flow(index)}>
                    {questions[
                      e.surveyQuestionId > 10
                        ? 10 + Math.floor(e.surveyQuestionId / 15)
                        : e.surveyQuestionId - 1
                    ]?.emoji +
                      " " +
                      (index !== 9 ? user.nickname : "") +
                      questions[
                        e.surveyQuestionId > 10
                          ? 10 + Math.floor(e.surveyQuestionId / 15)
                          : e.surveyQuestionId - 1
                      ]?.question}
                  </span>
                </div>
                {questions[
                  e.surveyQuestionId > 10
                    ? 10 + Math.floor(e.surveyQuestionId / 15)
                    : e.surveyQuestionId - 1
                ]?.type !== "multi_select" ? (
                  <div className={"w-full bg-light-gray rounded-md px-5 py-2 " + flow(index)}>
                    {list[index]?.response}
                  </div>
                ) : (
                  <div className="w-full flex flex-wrap bg-light-gray rounded-md px-5 py-2">
                    {list[index]?.response.split(",").map((e: string, i: number) => {
                      return (
                        <div
                          key={i}
                          className="w-auto bg-soft-gray px-3 mr-3 my-1 rounded-md font-bold py-0.5 text-[14px]"
                        >
                          {e}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
