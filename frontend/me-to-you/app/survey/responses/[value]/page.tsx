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
import { setQuestionState } from "@/store/questionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addResponse, setRespondentNickname } from "@/store/responseSlice";

const userName = "김싸피";

const Page = () => {
  const questionState = useAppSelector(state => state.question.questionNumber);
  const sideBarState = useAppSelector(state => state.question.isSideBarOpen);
  const responseList = useAppSelector(state => state.surveyResponse.surveyResponseRequestList);
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const nickname = params.get("nickname") || "";
  const router = useRouter();

  const handlerSubmit = async () => {
    await dispatch(setRespondentNickname(nickname));
    console.info(responseList);
    //router.push("../result");
  };

  const handlerSingleChoiceAnswer = (questionId: number, option: string) => {
    dispatch(
      addResponse({
        surveyQuestionId: questionId,
        response: [option],
      })
    );
  };

  const handlerMultiSelectAnswer = (questionId: number, option: string) => {
    const existingResponse = responseList.find(
      response => response.surveyQuestionId === questionId
    );

    const selectedOptions = existingResponse ? existingResponse.response : [];
    const isOptionSelected = selectedOptions.includes(option);

    const updatedResponse = isOptionSelected
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];

    dispatch(
      addResponse({
        surveyQuestionId: questionId,
        response: updatedResponse,
      })
    );
  };

  const handlerNextQuestion = () => {
    if (questionState < 10) dispatch(setQuestionState(questionState + 1));
  };

  const handlerPrevQuestion = () => {
    if (questionState > 1) dispatch(setQuestionState(questionState - 1));
  };

  return (
    <div className="w-[90%] ml-auto mr-auto h-[90vh] flex flex-col justify-between py-4">
      <div>
        <ProgressBar progress={questionState * 10} width={100} className="h-2 mb-6" />
        <div className="font-bold text-2xl mt-4 mb-4">
          {survey.questions
            .filter(question => question.id === questionState)
            .map(question => (
              <div key={question.id}>
                {question.question.startsWith("님")
                  ? question.emoji + userName + question.question
                  : question.emoji + question.question}
              </div>
            ))}
        </div>
        {!sideBarState && (
          <div className="mb-6">
            {survey.questions
              .filter(question => question.id === questionState)
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
                          isSelected={
                            responseList.find(response => response.surveyQuestionId === question.id)
                              ?.response[0] === option
                          }
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
                          isSelected={(
                            responseList.find(response => response.surveyQuestionId === question.id)
                              ?.response || []
                          ).includes(option)}
                          onClick={() => handlerMultiSelectAnswer(question.id, option)}
                        >
                          {option}
                        </SelectButton>
                      ))}
                    </div>
                  ) : question.type === "short_answer" ? (
                    <div className="mt-2">
                      <TextInput
                        placeholder="10자 이내로 입력하세요."
                        handleChangeInput={e =>
                          handlerSingleChoiceAnswer(question.id, e.target.value)
                        }
                        value={
                          responseList.find(response => response.surveyQuestionId === question.id)
                            ?.response[0] || ""
                        }
                      />
                    </div>
                  ) : question.type === "long_answer" ? (
                    <div className="mt-2">
                      <TextArea
                        width={100}
                        maxLength={500}
                        onChange={e => handlerSingleChoiceAnswer(question.id, e.target.value)}
                        value={
                          responseList.find(response => response.surveyQuestionId === question.id)
                            ?.response[0] || ""
                        }
                      />
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center ">
        {questionState > 1 && (
          <Button
            size="md"
            option="secondary"
            className="w-[45%]"
            onClick={() => handlerPrevQuestion()}
          >
            이전
          </Button>
        )}
        {questionState < 10 ? (
          <Button
            size="md"
            className={`w-${questionState > 1 ? "[45%]" : "full"}`}
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
