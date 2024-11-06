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
  const router = useRouter();
  const [isCurrent, setIsCurrent] = useState(-1);
  const [name, setName] = useState("");
  const { list } = useAppSelector(state => state.respondentDetail);
  const resList = useAppSelector(state => state.respondents).list;
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      let isIndex = false;
      await dispatch(loadRespondentDetail(param.respondentId));
      await dispatch(loadRespondentList());
      await dispatch(loadUser());

      resList.forEach(e => {
        if (e.respondentId === Number(param.respondentId) && e.respondentNickname !== undefined) {
          setName(e.respondentNickname !== "" ? e.respondentNickname : "익명");
          isIndex = true;
        }
      });
      if (!isIndex) router.push("/results/respondents");
    })();
  }, [dispatch, param.respondentId, resList, router]);

  const questions = survey.questions;

  const flow = (i: number) => {
    return i === isCurrent ? "" : "truncate";
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-[90%]">
        <ProfileCard className="mt-5 mb-7 w-full" name={name} date={list[0]?.createdDate} />
        <div className="relative flex flex-wrap gap-3 mb-10">
          {questions.map((e, index) => {
            return (
              <div
                key={index}
                className={"w-full " + flow(index)}
                onClick={() => (index === isCurrent ? setIsCurrent(-1) : setIsCurrent(index))}
              >
                <div className={"my-2 font-bold flex " + flow(index)}>
                  <span>{index + 1 + "."}</span>
                  <span className={"pl-1 " + flow(index)}>
                    {e.emoji + " " + (index !== 9 ? user.nickname : "") + e.question}
                  </span>
                </div>
                {e.type !== "multi_select" ? (
                  <div className="w-full bg-light-gray rounded-md px-5 py-2">
                    {list[index]?.response}
                  </div>
                ) : (
                  <div className="w-full flex bg-light-gray rounded-md px-5 py-2">
                    {list[index]?.response.split(",").map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="w-auto bg-soft-gray px-3 mr-3 rounded-md font-bold py-1 text-[14px]"
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
