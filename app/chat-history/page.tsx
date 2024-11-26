"use client";

import React, { useState, useEffect } from "react";
import ChatResultCard from "@/components/chat-history/ChatResultCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatHistory, loadChatState } from "@/slice/chatHistorySlice";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { loadUser } from "@/slice/userSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const router = useRouter();
  const { content, last, number, isLoading } = useAppSelector(state => state.chatHistory);
  const { user } = useAppSelector(state => state.user);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (user.userId === 0) {
        await dispatch(loadUser());
      }
      await dispatch(loadChatHistory({ status: "answer-bot", page: 0 }));
      if (user.userId !== 0) {
        await dispatch(loadChatState(user.userId));
      }
    })();
  }, [dispatch, user.userId]);

  useEffect(() => {
    (async () => {
      if (exist === undefined) {
        return;
      }
      if (!exist) {
        await Swal.fire({
          icon: "warning",
          text: "아직 챗봇이 없는 사용자 입니다!",
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
        router.push("/");
      }
    })();
  }, [exist]);

  const handleLoadMore = async () => {
    await dispatch(loadChatHistory({ status: "answer-bot", page: number + 1 }));
  };

  useInfiniteScroll({
    loading: isLoading,
    hasMore: !last,
    onLoadMore: handleLoadMore,
    targetId: "load-more",
  });

  return (
    <div className="w-[90%] mx-auto ">
      <div className="flex justify-between mt-4">
        <Link href="" className="text-primary text-md font-bold self-center">
          ✨ 챗봇 답변
        </Link>
        <Link href="chat-history/answer" className="text-gray text-sm self-center">
          💡 직접 답변
        </Link>
        <Link href="chat-history/wait" className="text-gray text-sm self-center">
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
