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
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { loadUser } from "@/slice/userSlice";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [current, setCurrent] = useState(-1);
  const [filterNum, setFilterNum] = useState(0);
  const [list, setList] = useState([]);
  const router = useRouter();
  const { content, isLoading, number, last } = useAppSelector(state => state.chatHistory);
  const { user } = useAppSelector(state => state.user);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (user.userId === 0) {
        await dispatch(loadUser());
      }
      await dispatch(loadChatHistory({ status: "answer-user", page: 0 }));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
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

  useEffect(() => {
    filterHandle(filterNum);
  }, [filterNum, content]);

  const handleLoadMore = async () => {
    await dispatch(loadChatHistory({ status: "answer-bot", page: number + 1 }));
  };

  useInfiniteScroll({
    loading: isLoading,
    hasMore: !last,
    onLoadMore: handleLoadMore,
    targetId: "load-more",
  });

  const createPrompt = async (id: number, key: string) => {
    if (key === "add") {
      await dispatch(updateChatbotPrompt({ chatBotId: id }));
      await Swal.fire({
        title: "학습 완료",
        text: "나의 챗봇이 해당 답변을 학습했어요!",
        icon: "success",
        confirmButtonColor: "#5498FF",
        confirmButtonText: "확인",
      });
    } else if (key === "remove") {
      await dispatch(updateChatbotPromptRemove({ chatBotId: id }));
      await Swal.fire({
        title: "학습 취소",
        text: "나의 챗봇이 해당 답변을 잊었어요!",
        icon: "success",
        confirmButtonColor: "#5498FF",
        confirmButtonText: "확인",
      });
    }
    await dispatch(loadChatHistory({ status: "answer-user", page: 0 }));
  };

  const filterHandle = (e: number) => {
    setCurrent(-1);
    switch (e) {
      case 0:
        setList(content);
        break;
      case 1:
        setList(
          content.filter(
            (e: {
              chatBotId: number;
              question: string;
              response: string;
              isQuestionIncluded: boolean;
            }) => {
              return e.isQuestionIncluded === true;
            }
          )
        );
        break;
      case 2:
        setList(
          content.filter(
            (e: {
              chatBotId: number;
              question: string;
              response: string;
              isQuestionIncluded: boolean;
            }) => {
              return e.isQuestionIncluded === false;
            }
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-[90%] mx-auto ">
      <div className="flex justify-between mt-4">
        <Link href="/chat-history" className="text-gray text-sm self-center">
          ✨ 챗봇 답변
        </Link>
        <Link href="" className="text-primary text-md font-bold self-center">
          💡 직접 답변
        </Link>
        <Link href="/chat-history/wait" className="text-gray text-sm self-center">
          💬 답변 기다리는 중
        </Link>
      </div>
      <div className="mt-6 text-gray flex w-[50%] justify-between text-sm align-end">
        <span
          className={filterNum === 0 ? "text-primary font-bold" : ""}
          onClick={() => setFilterNum(0)}
        >
          전체
        </span>

        <span
          className={filterNum === 1 ? "text-primary font-bold" : ""}
          onClick={() => setFilterNum(1)}
        >
          학습완료
        </span>

        <span
          className={filterNum === 2 ? "text-primary font-bold" : ""}
          onClick={() => setFilterNum(2)}
        >
          학습미완료
        </span>
      </div>
      {content[0]?.question === undefined || list.length === 0 ? (
        <div className="text-gray mt-4 ">대화 내용이 없어요..</div>
      ) : (
        <div className="mt-3 mb-5">
          {list.map(
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
                      <span className="font-medium">완료된 학습</span>입니다. 취소하려면{" "}
                      <span
                        className="text-pink font-medium"
                        onClick={() => createPrompt(e.chatBotId, "remove")}
                      >
                        취소
                      </span>
                      를 클릭하세요.
                    </p>
                  ) : (
                    <p
                      className={
                        "text-[12px] text-right font-light " + (current === index ? "" : "hidden")
                      }
                    >
                      이 대화를 챗봇에 추가 학습 시키시려면{" "}
                      <span
                        className="text-primary font-medium"
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
      <div id="load-more">{isLoading ? "..." : ""}</div>
    </div>
  );
};

export default Page;
