"use client";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import React, { useState } from "react";
import survey from "@/public/survey.json";
import SelectButton from "@/components/common/SelectButton";
import TextInput from "@/components/common/TextInput";
import TextArea from "@/components/common/TextArea";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const userName = "김싸피";

const Page = () => {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const params = useSearchParams();
  const nickname = params.get("nickname");
  const router = useRouter();

  const handlerSubmit = () => {
    console.info(answers);
    console.info(nickname);
    router.push("../responses/result");
  };

  const handlerSingleChoiceAnswer = (questionId: number, option: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handlerMultiSelectAnswer = (questionId: number, option: string) => {
    setAnswers(prevAnswers => {
      const selectedOptions = (prevAnswers[questionId] as string[]) || [];
      const isOptionSelected = selectedOptions.includes(option);

      return {
        ...prevAnswers,
        [questionId]: isOptionSelected
          ? selectedOptions.filter(opt => opt !== option)
          : [...selectedOptions, option],
      };
    });
  };

  const handlerNextQuestion = () => {
    setQuestionNumber(prev => prev + 1);
  };

  const handlerPrevQuestion = () => {
    setQuestionNumber(prev => prev - 1);
  };

  return (
    <div className="w-[90%] ml-auto mr-auto h-[90vh] flex flex-col justify-between py-4">
      <div>
        <ProgressBar progress={questionNumber * 10} width={100} className="h-2 mb-6" />
        <div className="font-bold text-2xl mt-4 mb-4">
          {survey.questions
            .filter(question => question.id === questionNumber)
            .map(question => (
              <div key={question.id}>
                {question.question.startsWith("님")
                  ? question.emoji + userName + question.question
                  : question.emoji + question.question}
              </div>
            ))}
        </div>
        <div className="mb-6">
          {survey.questions
            .filter(question => question.id === questionNumber)
            .map(question => (
              <div key={question.id}>
                {question.type === "multiple_choice" ||
                question.type === "multiple_choice_with_text" ? (
                  <div className="flex flex-col h-[60vh] justify-around">
                    {question.options?.map((option, idx) => (
                      <SelectButton
                        size="sm"
                        key={idx}
                        className="w-full text-left font-bold h-10"
                        isSelected={answers[question.id] === option}
                        onClick={() => handlerSingleChoiceAnswer(question.id, option)}
                      >
                        {option}
                      </SelectButton>
                    ))}
                  </div>
                ) : question.type === "multi_select" ? (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {question.options?.map((option, idx) => (
                      <SelectButton
                        size="sm"
                        key={idx}
                        isSelected={((answers[question.id] as string[]) || []).includes(option)}
                        onClick={() => handlerMultiSelectAnswer(question.id, option)}
                      >
                        {option}
                      </SelectButton>
                    ))}
                  </div>
                ) : question.type === "short_answer" ? (
                  <TextInput
                    placeholder="10자 이내로 입력하세요."
                    handleChangeInput={e => handlerSingleChoiceAnswer(question.id, e.target.value)}
                    value={(answers[question.id] as string) || ""}
                  />
                ) : question.type === "long_answer" ? (
                  <TextArea
                    width={100}
                    maxLength={500}
                    onChange={e => handlerSingleChoiceAnswer(question.id, e.target.value)}
                    value={(answers[question.id] as string) || ""}
                  />
                ) : null}
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        {questionNumber > 1 && (
          <Button
            size="md"
            option="secondary"
            className="w-[45%]"
            onClick={() => handlerPrevQuestion()}
          >
            이전
          </Button>
        )}
        {questionNumber < 10 ? (
          <Button
            size="md"
            className={`w-${questionNumber > 1 ? "[45%]" : "full"} ml-auto mr-auto`}
            onClick={() => handlerNextQuestion()}
          >
            다음
          </Button>
        ) : (
          <Button type="submit" size="md" className="w-[45%]" onClick={() => handlerSubmit()}>
            제출
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
