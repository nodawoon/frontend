"use client";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import React, { useEffect, useState } from "react";
import survey from "@/public/survey.json";
import SelectButton from "@/components/common/SelectButton";
import TextInput from "@/components/common/TextInput";
import TextArea from "@/components/common/TextArea";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { setQuestionState } from "@/slice/questionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addResponse, addRespondentNickname, addshareUrl } from "@/slice/responseSlice";
import { createSurveyResponse, getUserNickname } from "@/services/share";
import Swal from "sweetalert2";

const Page = () => {
  const questionState = useAppSelector(state => state.question.questionNumber);
  const sideBarState = useAppSelector(state => state.question.isSideBarOpen);
  const responseList = useAppSelector(state => state.surveyResponse.surveyResponseRequestList);
  const submitForm = useAppSelector(state => state.surveyResponse);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = useParams();
  const [customAnswer, setCustomAnswer] = useState<{ [key: number]: string }>({});
  const [isCustomInputActive, setIsCustomInputActive] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();

  const id = params.value;
  const nickname: string | null = searchParams.get("nickname") ?? "";
  const [userName, setUserName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [selectedOptionsCount, setSelectedOptionsCount] = useState(0);

  useEffect(() => {
    const getUesrName = async () => {
      if (typeof id === "string") {
        await getUserNickname(id).then(res => {
          setUserName(res.data.data.nickname);
        });
      }
    };

    getUesrName();
    dispatch(addshareUrl(`${id}`));
    dispatch(addRespondentNickname(nickname));
  }, [id]);

  useEffect(() => {
    const existingResponse = responseList.find(
      response => response?.surveyQuestionId === questionState
    );

    if (!existingResponse) {
      dispatch(
        addResponse({
          surveyQuestionId: questionState,
          response: [],
        })
      );
    }
  }, [questionState, responseList, dispatch]);

  const handlerSubmit = async () => {
    if (isSubmit) return;

    const checkResponse = responseList.every(response => {
      if (
        response.response.length === 0 ||
        response.response[0] === "" ||
        (response.surveyQuestionId === 2 && response.response.length < 3)
      ) {
        Swal.fire({
          title: `${response.surveyQuestionId}번 항목을 작성하지 않으셨습니다.`,
          text: "작성하고 오세요!",
          icon: "warning",
          confirmButtonColor: "#5498FF",
          showConfirmButton: true,
        });
        return false;
      } else {
        return true;
      }
    });

    if (checkResponse) {
      setIsSubmit(true);
      await createSurveyResponse(submitForm);
      Swal.fire({
        title: "설문 제출 성공!",
        text: "답변이 친구에게로 전달 될거에요.",
        icon: "success",
        confirmButtonColor: "#5498FF",
        showConfirmButton: true,
      }).then(() => {
        router.push("/survey/result");
      });
    }
  };

  const handlerSingleChoiceAnswer = (questionId: number, option: string) => {
    if (option === "직접 입력") {
      setIsCustomInputActive(prev => ({ ...prev, [questionId]: true }));
      setCustomAnswer(prev => ({ ...prev, [questionId]: "" }));
      dispatch(
        addResponse({
          surveyQuestionId: questionId,
          response: [], // 다른 응답을 취소하기 위해 빈 배열로 설정
        })
      );
    } else {
      setIsCustomInputActive(prev => ({ ...prev, [questionId]: false }));
      dispatch(
        addResponse({
          surveyQuestionId: questionId,
          response: [option],
        })
      );
    }
  };

  const handleCustomAnswerChange = (questionId: number, value: string) => {
    setCustomAnswer(prev => ({ ...prev, [questionId]: value }));
    dispatch(
      addResponse({
        surveyQuestionId: questionId,
        response: [value],
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
      : selectedOptions.length < 12
        ? [...selectedOptions, option]
        : selectedOptions;

    if (questionId === 2) {
      setSelectedOptionsCount(updatedResponse.length);
    }

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
        <div className="font-bold text-2xl mt-10 mb-4">
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
                    <div className="flex flex-col justify-around">
                      {question.options?.map((option, idx) => (
                        <div key={idx}>
                          <SelectButton
                            size="sm"
                            className="w-full text-left font-bold h-10 mt-[25px]"
                            isSelected={
                              responseList.find(
                                response => response?.surveyQuestionId === question.id
                              )?.response[0] === option ||
                              (option === "직접 입력" && isCustomInputActive[question.id])
                            }
                            onClick={() => handlerSingleChoiceAnswer(question.id, option)}
                          >
                            {option}
                          </SelectButton>
                          {isCustomInputActive[question.id] && option === "직접 입력" && (
                            <div className="mt-[10px]">
                              <TextInput
                                placeholder="25자 이내로 입력하세요."
                                handleChangeInput={e =>
                                  handleCustomAnswerChange(question.id, e.target.value)
                                }
                                value={customAnswer[question.id] || ""}
                                maxLength={25}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : question.type === "multi_select" ? (
                    <div className="grid grid-cols-4 gap-2 mt-2 xs-mobile:grid-cols-3">
                      {question.options?.map((option, idx) => {
                        const existingResponse = responseList.find(
                          response => response?.surveyQuestionId === question.id
                        );
                        const selectedOptions = existingResponse ? existingResponse.response : [];
                        const isOptionSelected = selectedOptions.includes(option);

                        const isDisabled = !isOptionSelected && selectedOptions.length >= 12;

                        return (
                          <SelectButton
                            size="sm"
                            key={idx}
                            isSelected={isOptionSelected}
                            onClick={() => handlerMultiSelectAnswer(question.id, option)}
                            disabled={isDisabled}
                          >
                            {option}
                          </SelectButton>
                        );
                      })}
                    </div>
                  ) : question.type === "short_answer" ? (
                    <div className="mt-2">
                      <TextInput
                        placeholder="25자 이내로 입력하세요."
                        handleChangeInput={e =>
                          handlerSingleChoiceAnswer(question.id, e.target.value)
                        }
                        value={
                          responseList.find(response => response?.surveyQuestionId === question.id)
                            ?.response[0] || ""
                        }
                        maxLength={25}
                      />
                    </div>
                  ) : question.type === "long_answer" ? (
                    <div className="mt-2">
                      <TextArea
                        width={100}
                        maxLength={500}
                        onChange={e => handlerSingleChoiceAnswer(question.id, e.target.value)}
                        value={
                          responseList.find(response => response?.surveyQuestionId === question.id)
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

      <div className="flex justify-between items-center pb-5">
        {questionState > 1 && (
          <Button
            size="md"
            option="secondary"
            className="w-[45%] z-10"
            onClick={() => handlerPrevQuestion()}
          >
            이전
          </Button>
        )}
        {questionState < 10 ? (
          <Button
            size="md"
            className={`w-${questionState > 1 ? "[45%]" : "full"} z-10`}
            onClick={() => handlerNextQuestion()}
            disabled={
              questionState === 2
                ? selectedOptionsCount < 3
                : !responseList.find(response => response?.surveyQuestionId === questionState)
                    ?.response[0]
            }
          >
            다음
          </Button>
        ) : (
          <Button
            size="md"
            className="w-[45%] z-10"
            onClick={() => handlerSubmit()}
            disabled={isSubmit}
          >
            제출
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page;
