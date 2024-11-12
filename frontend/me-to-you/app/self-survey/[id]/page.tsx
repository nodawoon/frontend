"use client";

import ProgressBar from "@/components/common/ProgressBar";
import { useState } from "react";
import chatbot from "@/public/chatbot-survey.json";
import SelectButton from "@/components/common/SelectButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addResponse } from "@/slice/chatbotResponseSlice";
import TextInput from "@/components/common/TextInput";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import Swal from "sweetalert2";
import { createChatbotResponse } from "@/services/chatbot";
import { useRouter } from "next/navigation";
import { setCategoryState } from "@/slice/chatbotQuestionSlice";

const Page = () => {
  const categoryState = useAppSelector(state => state.chatbotQuestion.categoryNumber);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({});
  const dispatch = useAppDispatch();
  const chatbotResoponseList = useAppSelector(state => state.chatbotResponse.responses);
  const submitForm = useAppSelector(state => state.chatbotResponse);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  const isCategoryCompleted = (categoryId: number) => {
    const category = chatbot.find(category => category.categoryId === categoryId);
    if (!category) return false;

    return category.questions.every(question => {
      const response = chatbotResoponseList.find(res => res.question === question.question);

      if (!response || response.response.length === 0) return false;

      if (question.question === "성격이 어떤 것 같아? (최소 3개~ 최대 12개)") {
        return response.response.split(", ").length >= 3;
      }

      if (question.question === "이성을 만날 때 제일 중요하게 생각하는 거 3개만 골라줘!") {
        return response.response.split(", ").length === 3;
      }

      return true;
    });
  };

  const handlerSubmit = async () => {
    if (isSubmit) return;

    const checkResponse = chatbotResoponseList.every(response => {
      if (
        response.response.length === 0 ||
        response.response === "" ||
        (response.question === "성격이 어떤 것 같아? (최소 3개~ 최대 12개)" &&
          response.response.length < 3) ||
        (response.question === "이성을 만날 때 제일 중요하게 생각하는 거 3개만 골라줘!" &&
          response.response.length !== 3)
      ) {
        Swal.fire({
          title: `작성하지 않은 답이 있어요.`,
          text: "작성하고 오세요!",
          icon: "warning",
          showConfirmButton: true,
        });
        return false;
      } else {
        return true;
      }
    });

    if (checkResponse) {
      setIsSubmit(true);
      await createChatbotResponse(submitForm.responses);
      Swal.fire({
        title: "설문 제출 성공!",
        text: "이 답변을 토대로, 챗봇이 생성될거에요.",
        icon: "success",
        showConfirmButton: true,
      }).then(() => {
        router.push("/self-survey/result");
      });
    }
  };

  const handleNextQuestion = () => {
    if (categoryState < 6) {
      dispatch(setCategoryState(categoryState + 1));
    }
  };

  const handlePrevQuestion = () => {
    if (categoryState > 1) {
      dispatch(setCategoryState(categoryState - 1));
    }
  };

  const handleSingleSelect = (option: string, idx: number, question: string) => {
    setSelectedOption(option);
    dispatch(addResponse({ idx, question: question, response: option }));
  };

  const handleMultiSelect = (option: string, idx: number, question: string) => {
    const currentOptions = selectedOptions[idx] || [];
    const isSelected = currentOptions.includes(option);

    const updatedOptions = isSelected
      ? currentOptions.filter(item => item !== option)
      : [...currentOptions, option];

    const maxSelections = idx === 1 ? 12 : idx === 26 ? 3 : Infinity;

    if (updatedOptions.length > maxSelections) {
      return;
    }

    setSelectedOptions(prev => ({
      ...prev,
      [idx]: updatedOptions,
    }));

    const responseString = updatedOptions.join(", ");
    dispatch(addResponse({ idx, question: question, response: responseString }));
  };

  return (
    <div className="w-full">
      <div className="mt-4 w-[90%] ml-auto mr-auto">
        <ProgressBar
          progress={Math.round(categoryState * 16.666666666)}
          width={100}
          className="h-2 mb-6"
          questionNum={6}
        />
      </div>
      {chatbot
        .filter(category => category.categoryId === categoryState)
        .map(questions => (
          <div key={questions.categoryId} className="w-[90%] ml-auto mr-auto">
            {questions.questions.map(question => (
              <div key={question.id}>
                <div className="mt-8 font-bold text-xl">
                  {question.emoji} {question.question}
                </div>
                <div className="mt-2.5">
                  {question.type === "multiple_choice" ? (
                    question.options?.map(option => (
                      <div key={option} className="p-1">
                        <SelectButton
                          onClick={() =>
                            handleSingleSelect(option, question.id - 1, question.question)
                          }
                          isSelected={selectedOption?.includes(option)}
                          className="w-full text-left py-2"
                        >
                          {option}
                        </SelectButton>
                      </div>
                    ))
                  ) : question.type === "multi_select" ? (
                    <div className="grid grid-cols-4 gap-1 mt-2.5 ">
                      {question.options?.map((option, idx) => (
                        <SelectButton
                          key={idx}
                          onClick={() =>
                            handleMultiSelect(option, question.id - 1, question.question)
                          }
                          isSelected={selectedOptions[question.id - 1]?.includes(option)}
                          disabled={
                            (question.id - 1 === 1 &&
                              !selectedOptions[question.id - 1]?.includes(option) &&
                              selectedOptions[question.id - 1]?.length >= 12) ||
                            (question.id - 1 === 26 &&
                              !selectedOptions[question.id - 1]?.includes(option) &&
                              selectedOptions[question.id - 1]?.length >= 3)
                          }
                          className="h-12 whitespace-pre-line break-words"
                        >
                          {option}
                        </SelectButton>
                      ))}
                    </div>
                  ) : question.type === "short_answer" ? (
                    <div className="w-full">
                      <TextInput
                        placeholder="25자 이내로 입력하세요."
                        maxLength={25}
                        handleChangeInput={e =>
                          handleSingleSelect(e.target.value, question.id - 1, question.question)
                        }
                        value={
                          chatbotResoponseList.find(
                            response => response.question === question.question
                          )?.response || ""
                        }
                      />
                    </div>
                  ) : question.type === "long_answer" ? (
                    <div className="w-full">
                      <TextArea
                        width={100}
                        maxLength={500}
                        onChange={e =>
                          handleSingleSelect(e.target.value, question.id - 1, question.question)
                        }
                        value={
                          chatbotResoponseList.find(
                            response => response.question === question.question
                          )?.response || ""
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}

      <div className="mt-10 mb-3">
        {categoryState === 1 ? (
          <div className="w-full flex justify-center">
            <Button
              size="md"
              className="w-[90%]"
              onClick={() => handleNextQuestion()}
              disabled={!isCategoryCompleted(categoryState)}
            >
              다음
            </Button>
          </div>
        ) : categoryState === 6 ? (
          <div className="flex">
            <div className="w-full flex justify-center">
              <Button
                size="md"
                className="w-[90%]"
                option="secondary"
                onClick={() => handlePrevQuestion()}
              >
                이전
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <Button
                size="md"
                className="w-[90%]"
                onClick={() => handlerSubmit()}
                disabled={!isCategoryCompleted(categoryState)}
              >
                제출
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="w-full flex justify-center">
              <Button
                size="md"
                className="w-[90%]"
                option="secondary"
                onClick={() => handlePrevQuestion()}
              >
                이전
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <Button
                size="md"
                className="w-[90%]"
                onClick={() => handleNextQuestion()}
                disabled={!isCategoryCompleted(categoryState)}
              >
                다음
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
