"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import Image from "next/image";

const Page: React.FC = () => {
  const param = useParams();
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

  const profileCard = () => {
    return (
      <div className="flex justify-start h-auto max-w-[100%] text-medium-gray grow">
        <Image
          className="my-auto rounded-full border border-gray"
          src="/character.svg"
          alt="프로필 이미지"
          width="50"
          height="50"
        />
        <div className="my-auto flex w-96 flex-col justify-center ml-2 py-3 ">
          <div className="w-auto text-sm">{user.date}</div>
          <div className="w-full py-0.5 text-sm">
            <span className="font-bold text-[16px] text-black">{user.name} </span>
            님은 나에 대해 이렇게 생각해요.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col w-[90%]">
        <div className="mt-5 mb-7 w-full">{profileCard()}</div>
        <div className="relative flex flex-wrap gap-3 mb-10">
          {questions.map((e, index) => {
            return (
              <div key={index} className="truncate w-full">
                <div className="truncate my-2 font-bold">
                  {index + 1 + ". " + e.emoji + " " + myName + e.question}
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
