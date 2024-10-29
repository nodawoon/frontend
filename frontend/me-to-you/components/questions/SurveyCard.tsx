"use client";
import React, { useState } from "react";
import survey from "../../public/survey.json";
import SelectButton from "../common/SelectButton";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";

const userName = "김싸피";

const SurveyCard = () => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null); // 열려 있는 질문 ID

  const handleClickOpen = (questionId: string) => {
    // 현재 열려 있는 질문을 다시 클릭하면 닫히고, 다른 질문을 클릭하면 해당 질문이 열리도록 설정
    setOpenQuestionId(prev => (prev === questionId ? null : questionId));
  };

  return (
    <div className="p-2 rounded-lg w-[85%] ml-auto mr-auto">
      {survey.questions.map(question => (
        <div key={question.id} className="mb-6 border border-none p-4 rounded-2xl bg-white">
          <div
            className="flex justify-between items-center"
            onClick={() => handleClickOpen(question.id.toString())}
          >
            <p
              className={`text-lg font-semibold ${openQuestionId === question.id.toString() ? "" : "truncate-text"}`}
            >
              {question.emoji}{" "}
              {!question.question.startsWith("님")
                ? `${question.question}`
                : `${userName + question.question}`}
            </p>
            <span className="material-symbols-rounded text-icon cursor-pointer text-primary">
              {openQuestionId === question.id.toString()
                ? "keyboard_arrow_up"
                : "keyboard_arrow_down"}
            </span>
          </div>
          {(question.type === "multiple_choice_with_text" ||
            question.type === "multiple_choice") && (
            <div
              className={`transition-transform duration-500 ease-in-out transform-gpu origin-top ${
                openQuestionId === question.id.toString()
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 h-0"
              }`}
              style={{ transformOrigin: "top", overflow: "hidden" }}
            >
              <div className="space-y-2 mt-2">
                {question.options?.map((option, idx) => (
                  <SelectButton size="sm" key={idx}>
                    {option}
                  </SelectButton>
                ))}
              </div>
            </div>
          )}
          {question.type === "multi_select" && (
            <div
              className={`transition-transform duration-500 ease-in-out transform-gpu origin-top ${
                openQuestionId === question.id.toString()
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 h-0"
              }`}
              style={{ transformOrigin: "top", overflow: "hidden" }}
            >
              <div className="grid grid-flow-cols grid-cols-3 gap-2">
                {question.options?.map((option, idx) => (
                  <SelectButton size="sm" key={idx} disabled>
                    {option}
                  </SelectButton>
                ))}
              </div>
            </div>
          )}
          {question.type === "short_answer" && (
            <div
              className={`transition-transform duration-500 ease-in-out transform-gpu origin-top ${
                openQuestionId === question.id.toString()
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 h-0"
              }`}
              style={{ transformOrigin: "top", overflow: "hidden" }}
            >
              <div className="">
                <TextInput width={100} placeholder="10자 이내로 입력하세요." disabled />
              </div>
            </div>
          )}
          {question.type === "long_answer" && (
            <div
              className={`transition-transform duration-500 ease-in-out transform-gpu origin-top ${
                openQuestionId === question.id.toString()
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 h-0"
              }`}
              style={{ transformOrigin: "top", overflow: "hidden" }}
            >
              <div>
                <TextArea width={100} maxLength={500} disabled />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SurveyCard;
