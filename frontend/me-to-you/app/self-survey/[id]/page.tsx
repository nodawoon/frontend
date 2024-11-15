"use client";

import ProgressBar from "@/components/common/ProgressBar";
import { useEffect, useRef, useState } from "react";
import chatbot from "@/public/chatbot-survey.json";
import SelectButton from "@/components/common/SelectButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addResponse } from "@/slice/chatbotResponseSlice";
import TextInput from "@/components/common/TextInput";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import Swal from "sweetalert2";
import { createChatbotResponse } from "@/services/selfSurvey";
import { useRouter } from "next/navigation";
import { setCategoryState } from "@/slice/chatbotQuestionSlice";
import { CHATBOT_GUIDE } from "@/constants/chatbot";

const Page = () => {
  const categoryState = useAppSelector(state => state.chatbotQuestion.categoryNumber);
  const [selectedOption, setSelectedOption] = useState<{ [key: number]: string }>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({});
  const dispatch = useAppDispatch();
  const chatbotResoponseList = useAppSelector(state => state.chatbotResponse.responses);
  const submitForm = useAppSelector(state => state.chatbotResponse);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isCategoryCompleted = (categoryId: number) => {
    const category = chatbot.find(category => category.categoryId === categoryId);
    if (!category) return false;

    return category.questions.every(question => {
      const response = chatbotResoponseList.find(
        (res: { question: string }) => res.question === question.question
      );

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

    const checkResponse = chatbotResoponseList.every(
      (response: { response: string; question: string }) => {
        if (!response.response || response.response.length === 0) {
          return false;
        }

        if (response.question === "성격이 어떤 것 같아? (최소 3개~ 최대 12개)") {
          const selectedOptions = response.response.split(", ");
          return selectedOptions.length >= 3;
        }

        if (response.question === "이성을 만날 때 제일 중요하게 생각하는 거 3개만 골라줘!") {
          const selectedOptions = response.response.split(", ");
          return selectedOptions.length === 3;
        }

        return true;
      }
    );

    if (!checkResponse) {
      Swal.fire({
        title: `작성하지 않은 답이 있어요.`,
        text: "작성하고 오세요!",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    setIsSubmit(true);
    await createChatbotResponse(submitForm.responses);
    Swal.fire({
      title: "설문 제출 성공!",
      text: "이 답변을 토대로, 챗봇이 생성될 거에요.",
      icon: "success",
      showConfirmButton: true,
    }).then(() => {
      router.push("/self-survey/result");
    });
  };

  useEffect(() => {
    scrollTop();
  }, [categoryState]);

  const scrollTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextQuestion = () => {
    if (categoryState < 6) {
      dispatch(setCategoryState(categoryState + 1));
      setTimeout(() => scrollTop(), 100);
    }
  };

  const handlePrevQuestion = () => {
    if (categoryState > 1) {
      dispatch(setCategoryState(categoryState - 1));
      setTimeout(() => scrollTop(), 100);
    }
  };

  const handleSingleSelect = (option: string, idx: number, question: string) => {
    setSelectedOption(prev => ({
      ...prev,
      [idx]: option,
    }));
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
    <div className="w-full h-[90vh] overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
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
            <div className="text-[12px] text-dark-gray">
              {CHATBOT_GUIDE.map((str, idx) => (
                <p key={idx}>{str}</p>
              ))}
            </div>
            {questions.questions.map(question => (
              <div key={question.id}>
                <div className="mt-8 font-bold text-xl flex justify-start items-center">
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
                          isSelected={selectedOption[question.id - 1] === option}
                          className="w-full text-left py-2"
                        >
                          {option}
                        </SelectButton>
                      </div>
                    ))
                  ) : question.type === "multi_select" ? (
                    <div className="flex flex-wrap gap-x-1">
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
                          className="h-10 whitespace-pre-line break-words"
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
                            (response: { question: string }) =>
                              response.question === question.question
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
                            (response: { question: string }) =>
                              response.question === question.question
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
