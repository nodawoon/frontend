"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatState } from "@/slice/chatHistorySlice";

interface CardButtonProps {
  className?: string;
  page: number;
  title: string;
  text: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  className,
  page,
  title,
  text,
}: CardButtonProps) => {

  const user = useAppSelector(state => state.user.user);

  const { exist } = useAppSelector(state => state.chatState);
  const dispatch = useAppDispatch();
  const [chatURL, setChatURL] = useState("");

  useEffect(() => {
    (async () => {
      await dispatch(loadChatState());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (exist) {
      setChatURL(url);
    }
  }, [exist]);

  const errorMessage = () => {
    if (page === 4 || page === 5) {
      if (!exist) {
        Swal.fire({
          title: "챗봇 미학습",
          text: "챗봇을 먼저 학습해주세요!",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }
  };

  const combinedClassName =
    "flex flex-col justify-center h-20 px-3.5 text-base text-black bg-white font-bold break-words rounded-lg hover:bg-soft-gray";
  let url: string = "/";

  switch (page) {
    case 1:
      url += "questions";
      break;
    case 2:
      url += "results";
      break;
    case 3:
      url += `self-survey/${user.userId}`;
      break;
    case 4:
      url += "chat-history";
      break;
    case 5:
      url += "chat-history";
      break;
  }

  const errorMessage = () => {
    if (page !== 4) return;
    Swal.fire({
      icon: "info",
      title: "챗봇 개발 중!",
      text: "조금만 기다려주세요..!",
      confirmButtonColor: "#5498FF",
      confirmButtonText: "닫기",
    });
  };

  return (
    <Link
      href={page === 1 || page === 2 || page === 3 ? url : chatURL}
      className={`${combinedClassName} ${className}`}
      onClick={errorMessage}
    >
      <div className="flex w-full justify-between py-0.5 text-lg">
        <div className="w-auto">{title}</div>
        <span className="material-symbols-rounded text-icon">arrow_forward</span>
      </div>
      <div className="py-0.5 text-sm font-light">{text}</div>
    </Link>
  );
};

export default CardButton;
