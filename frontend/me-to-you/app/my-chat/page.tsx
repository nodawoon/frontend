"use client";

import Loading from "@/components/common/Loading";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getMyChatRoom } from "@/services/my-chat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [chatData, setChatData] = useState<MyChatResponse | null>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const router = useRouter();

  const handleMoveChatRoom = (userId: number, nickname: string) => {
    router.push(`/chat/${userId}?nickname=${nickname}`);
  };

  const getChatData = async (page: number) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await getMyChatRoom(page);
      const data: MyChatResponse = response.data.data;

      if (data.content.length === 0) {
        setHasMore(false);
      } else {
        setChatData(prev => {
          if (prev) {
            return {
              ...prev,
              content: [...prev.content, ...data.content],
            };
          }
          return data;
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatData(page);
  }, [page]);

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: () => setPage(prev => prev + 1),
    targetId: "infinite-scroll-target",
  });

  return (
    <div className="w-full bg-light-gray h-[92vh] overflow-y-auto scrollbar-hide">
      <div className="w-[90%] ml-auto mr-auto pt-6 pb-6">
        <p>친구의 챗봇과 대화한 기록이에요.</p>
        {chatData && chatData.content.length > 0 ? (
          <>
            {chatData.content.map((chat, idx) => (
              <div
                key={idx}
                className="flex bg-white justify-between items-center rounded-md p-4 mt-2 cursor-pointer hover:bg-soft-gray"
                onClick={() => handleMoveChatRoom(chat.targetUserId, chat.nickname)}
              >
                {chat.isNew ? (
                  <div className="mb-6 mr-4">
                    <p className="text-[#5498FF]">●</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex-1 pr-4 overflow-hidden">
                  <p className="flex justify-between font-semibold items-center">
                    {chat.nickname}{" "}
                    <span className="text-xs text-medium-gray">
                      {chat.answerStatus === "ANSWERED_BY_BOT" ? "" : "답변을 기다리고 있어요."}
                    </span>{" "}
                  </p>
                  <p className="mt-2 text-sm truncate overflow-hidden whitespace-nowrap">
                    {chat.lastChatBotAnswer}
                  </p>
                </div>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-light-gray flex items-center justify-center">
                  <Image
                    src={
                      chat.profileImageUrl?.startsWith("http")
                        ? chat.profileImageUrl
                        : "/images/character.svg"
                    }
                    alt="profile"
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            <div id="infinite-scroll-target" className="h-10"></div>
          </>
        ) : (
          <div className="ml-6">아직 참여한 채팅이 없어요.</div>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Page;
