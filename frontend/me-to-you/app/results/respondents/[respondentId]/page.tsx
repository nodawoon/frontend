"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import ProfileCard from "@/components/results/respondents/ProfileCard";

const Page: React.FC = () => {
  const param = useParams();
  const [isCurrent, setIsCurrent] = useState(-1);
  const user = { id: param.respondentId, name: "김싸피", date: "2024.10.24" };
  const myName = "이싸피";
  const questions = survey.questions;
  const answers = [
    ["친근하고 다정해 보였다."],
    ["책임감 있는", "긍정적인", "외향적인"],
    ["짱구!"],
    ["포메라니안"],
    ["평생"],
    ["짱구"],
    ["스터디"],
    ["멋진 개발자"],
    ["자율 프로젝트"],
    ["취뽀하자~"],
  ];

  const flow = (i: number) => {
    return i === isCurrent ? "" : "truncate";
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-[90%]">
        <ProfileCard className="mt-5 mb-7 w-full" name={user.name} date={user.date} />
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
                    {e.emoji + " " + (index !== 9 ? myName : "") + e.question}
                  </span>
                </div>
                {e.type !== "multi_select" ? (
                  <div className="w-full bg-light-gray rounded-md px-5 py-2">{answers[index]}</div>
                ) : (
                  <div className="w-full flex bg-light-gray rounded-md px-5 py-2">
                    {answers[index].map((e, index) => {
                      return (
                        <div
                          key={index}
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
