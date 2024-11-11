"use client";

import React, { useState, useEffect } from "react";
import ChatResultCard from "@/components/chat-history/ChatResultCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatHistory, loadChatState } from "@/slice/chatHistorySlice";
import { is } from "date-fns/locale";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [isExist, setIsExist] = useState(false);
  const { list } = useAppSelector(state => state.chatHistory);
  const { exist } = useAppSelector(state => state.chatState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadChatHistory());
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

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-around mt-4">
        <Link href="" className="text-primary text-md font-bold self-center">
          ✨ 챗봇 답변
        </Link>
        <Link href="/answer" className="text-gray text-sm self-center">
          💡 직접 답변
        </Link>
        <Link href="/wait" className="text-gray text-sm self-center">
          💬 답변 기다리는 중
        </Link>
      </div>
      {list[0]?.question === undefined ? (
        <div className="text-gray mt-5 ">아직 대화 내용이 없어요..</div>
      ) : (
        <div className="my-6">
          {list.map((e, index) => {
            return (
              <ChatResultCard
                className="mb-2 font-medium"
                question={e.question !== undefined ? e.question : ""}
                answer={e.answer !== undefined ? e.answer : ""}
                key={index}
                index={index}
                current={current}
                onClick={() => (index === current ? setCurrent(-1) : setCurrent(index))}
                state={current === index ? "up" : "down"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
