"use client";

import React, { useState, useEffect } from "react";
import ChatInputCard from "@/components/chat-history/ChatInputCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatHistory, loadChatState, updateChatResponse } from "@/slice/chatHistorySlice";
import Swal from "sweetalert2";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [isExist, setIsExist] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const { content } = useAppSelector(state => state.chatHistory);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadChatHistory({ status: "unanswer-bot", page: 0 }));
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

  const handleChange = (value: string) => {
    setSendMessage(value);
  };

  const submit = (index: number, id: number) => {
    if (current === index) {
      if (sendMessage.length === 0) {
        Swal.fire({
          title: "답변 미등록",
          text: "답변을 채워주세요!",
          icon: "warning",
          confirmButtonText: "확인",
        });
      } else {
        setCurrent(-1);
        sendTheMessage(id);
      }
    } else {
      setCurrent(index);
    }
  };

  const sendTheMessage = async (id: number) => {
    await dispatch(updateChatResponse({ chatBotId: id, params: { answer: sendMessage } }));
    await dispatch(loadChatHistory({ status: "unanswer-bot", page: 0 }));
    Swal.fire({
      title: "답변 등록",
      text: "답변이 등록되었어요!",
      icon: "success",
      confirmButtonText: "확인",
    });
  };

  return (
    <div className="w-[90%] mx-auto ">
      <div className="flex justify-around mt-4">
        <Link href="/chat-history" className="text-gray text-sm self-center">
          ✨ 챗봇 답변
        </Link>
        <Link href="/answer" className="text-gray text-sm self-center">
          💡 직접 답변
        </Link>
        <Link href="" className="text-primary text-md font-bold self-center">
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
                <ChatInputCard
                  className="mb-2 font-medium"
                  question={e.question !== undefined ? e.question : ""}
                  key={index}
                  index={index}
                  current={current}
                  onClick={() => submit(index, e.chatBotId)}
                  state={current === index ? "check" : "답변하기"}
                  submit={e => handleChange(e)}
                  chatbotId={e.chatBotId}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
