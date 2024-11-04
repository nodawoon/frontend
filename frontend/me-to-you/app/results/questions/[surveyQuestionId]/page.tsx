"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import survey from "../../../../public/survey.json";
import ResultCard from "@/components/results/ResultCard";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const param = useParams();
  const router = useRouter();
  const [isTruncate, setIsTruncate] = useState(-1);
  const name = "김싸피";
  if (Number(param.surveyQuestionId) < 1 || Number(param.surveyQuestionId) > 10) {
    router.push("/results");
    return;
  }
  const currentSurvey = survey.questions[Number(param.surveyQuestionId) - 1];
  const question: string = currentSurvey.emoji + " " + name + currentSurvey.question;
  const profileList: { name: string; response: string | string[]; date: string }[] = [
    {
      name: "김싸피",
      response:
        "친근하고 좋았다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
      date: "2024.10.17",
    },
    {
      name: "이싸피",
      response:
        "친구 하고 싶다kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkㅏㅏㅏk",
      date: "2024.10.24",
    },
    {
      name: "박싸피",
      response: "어색했다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
      date: "2024.10.25",
    },
    { name: "서싸피", response: ["다가가", "asd", "bsa"], date: "2024.10.30" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-light-gray">
      <div className="flex flex-col w-[90%]">
        <p className="text-[23px] mt-10 mb-5 w-full font-bold">{question}</p>
        <div className="relative flex flex-wrap gap-3">
          {profileList.map((e, index) => {
            return (
              <ResultCard
                key={index}
                name={e.name}
                text={e.response}
                date={e.date}
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
