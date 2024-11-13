"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import ChatResultCard from "@/components/chat-history/ChatResultCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadChatHistory,
  loadChatState,
  updateChatbotPrompt,
  updateChatbotPromptRemove,
} from "@/slice/chatHistorySlice";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [isExist, setIsExist] = useState(false);
  const { content } = useAppSelector(state => state.chatHistory);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadChatHistory({ status: "answer-user", page: 0 }));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(loadChatState());
      if (exist) {
        setIsExist(true);
      } else {
        setIsExist(false);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    console.log(isExist);
  }, [isExist]);

  const createPrompt = async (id: number, key: string) => {
    if (key === "add") {
      await dispatch(updateChatbotPrompt({ chatBotId: id }));
      Swal.fire({
        title: "학습 완료",
        text: "나의 챗봇이 해당 답변을 학습했어요!",
        icon: "success",
        confirmButtonText: "확인",
      });
    } else if (key === "remove") {
      await dispatch(updateChatbotPromptRemove({ chatBotId: id }));
      Swal.fire({
        title: "학습 취소",
        text: "나의 챗봇이 해당 답변을 잊었어요!",
        icon: "success",
        confirmButtonText: "확인",
      });
    }
    await dispatch(loadChatHistory({ status: "answer-user", page: 0 }));
  };

  return (
    <div className="w-[90%] mx-auto ">
      <div className="flex justify-around mt-4">
        <Link href="/chat-history" className="text-gray text-sm self-center">
          ✨ 챗봇 답변
        </Link>
        <Link href="" className="text-primary text-md font-bold self-center">
          💡 직접 답변
        </Link>
        <Link href="/wait" className="text-gray text-sm self-center">
          💬 답변 기다리는 중
        </Link>
      </div>
      {content[0]?.question === undefined ? (
        <div className="text-gray mt-5 ">아직 대화 내용이 없어요..</div>
      ) : (
        <div className="my-6">
          {content.map(
            (
              e: {
                chatBotId: number;
                question: string;
                response: string;
                isQuestionIncluded: boolean;
              },
              index: number
            ) => {
              return (
                <div className="mb-3" key={index}>
                  <ChatResultCard
                    className="mb-1 font-medium"
                    question={e.question !== undefined ? e.question : ""}
                    answer={e.response !== undefined ? e.response : ""}
                    index={index}
                    current={current}
                    onClick={() => (index === current ? setCurrent(-1) : setCurrent(index))}
                    state={current === index ? "up" : "down"}
                    responser="face"
                  />
                  {e.isQuestionIncluded ? (
                    <p
                      className={
                        "text-[12px] text-right font-light " + (current === index ? "" : "hidden")
                      }
                    >
                      학습을 완료했어요!{" "}
                      <span
                        className="text-pink"
                        onClick={() => createPrompt(e.chatBotId, "remove")}
                      >
                        취소하기
                      </span>
                    </p>
                  ) : (
                    <p
                      className={
                        "text-[12px] text-right font-light " + (current === index ? "" : "hidden")
                      }
                    >
                      이 대화를 챗봇에 추가 학습 시키시려면{" "}
                      <span
                        className="text-primary"
                        onClick={() => createPrompt(e.chatBotId, "add")}
                      >
                        여기
                      </span>
                      를 클릭하세요.
                    </p>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
