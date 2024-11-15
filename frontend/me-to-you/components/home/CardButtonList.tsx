"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUser } from "@/slice/userSlice";
import { useRouter } from "next/navigation";
import { getChatState } from "@/services/chatHistory";

interface CardButtonListProps {
  titleList: string[];
  textList: string[];
}

const CardButtonList: React.FC<CardButtonListProps> = ({ titleList, textList }) => {
  const user = useAppSelector(state => state.user.user);
  const { exist } = useAppSelector(state => state.chatHistory);
  const dispatch = useAppDispatch();
  const [chatURL, setChatURL] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user.userId === 0) {
      dispatch(loadUser());
    }
  }, [dispatch, user.userId]);

  const handleChatState = useCallback(async () => {
    if (exist) {
      setChatURL("/chat-history");
      router.push("/chat-history");
    }
    if (exist === undefined) {
      const updatedExist = await getChatState(user.userId);

      if (updatedExist) {
        setChatURL("/chat-history");
        router.push("/chat-history");
      } else {
        await Swal.fire({
          icon: "warning",
          text: "아직 챗봇이 없는 사용자 입니다!",
          confirmButtonColor: "#5498FF",
          confirmButtonText: "닫기",
        });
      }
    }
  }, [exist, user.userId, router]);

  const errorMessage = useCallback(
    async (page: number) => {
      if (page === 4) {
        await handleChatState();
      }
    },
    [handleChatState]
  );

  const getUrl = useCallback(
    (page: number) => {
      switch (page) {
        case 1:
          return "/questions";
        case 2:
          return "/results";
        case 3:
          return `/self-survey/${user.userId}`;
        case 4:
          return chatURL;
        case 5:
          return "/my-chat";
        default:
          return "/";
      }
    },
    [user.userId, chatURL]
  );

  return titleList.map((title, index) => (
    <Link
      href={getUrl(index + 1)}
      className="my-1.5 min-w-full flex flex-col justify-center h-20 px-3.5 text-base text-black bg-white font-bold break-words rounded-lg hover:bg-soft-gray"
      onClick={() => errorMessage(index + 1)}
      key={index}
    >
      <div className="flex w-full justify-between py-0.5 text-lg">
        <div className="w-auto">{title}</div>
        <span className="material-symbols-rounded text-icon">arrow_forward</span>
      </div>
      <div className="py-0.5 text-sm font-light xs-mobile:text-xs">{textList[index]}</div>
    </Link>
  ));
};

export default CardButtonList;
