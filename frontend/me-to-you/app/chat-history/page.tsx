"use client";

import React, { useState, useEffect } from "react";
import ChatResultCard from "@/components/chat-history/ChatResultCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatHistory, loadChatState } from "@/slice/chatHistorySlice";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [isExist, setIsExist] = useState(false);
  const { content, last, number, isLoading } = useAppSelector(state => state.chatHistory);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadChatHistory({ status: "answer-bot", page: 0 }));
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

  const handleLoadMore = async () => {
    await dispatch(loadChatHistory({ status: "answer-bot", page: number + 1 }));
  };

  useInfiniteScroll({
    loading: isLoading, // 로딩 상태 값
    hasMore: !last, // 더 불러올 데이터가 있는지
    onLoadMore: handleLoadMore, // 데이터 불러오는 함수
    targetId: "load-more", // target 요소의 div
  });

  return (
    <div className="w-[90%] mx-auto ">
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
                <ChatResultCard
                  className="mb-2 font-medium"
                  question={e.question !== undefined ? e.question : ""}
                  answer={e.response !== undefined ? e.response : ""}
                  key={index}
                  index={index}
                  current={current}
                  onClick={() => (index === current ? setCurrent(-1) : setCurrent(index))}
                  state={current === index ? "up" : "down"}
                  responser="smart_toy"
                />
              );
            }
          )}
        </div>
      )}
      <div id="load-more">{isLoading ? "..." : ""}</div>
    </div>
  );
};

export default Page;
