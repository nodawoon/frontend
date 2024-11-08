"use client";

import React, { useState } from "react";
import ChatResultCard from "@/components/chat-history/ChatResultCard";
import Link from "next/link";

const Page: React.FC = () => {
  const list = [1, 2, 3];
  const [current, setCurrent] = useState(-1);

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
      <div className="my-6">
        {list.map((e, index) => {
          return (
            <ChatResultCard
              className="mb-2 font-medium"
              question="질문입니다."
              answer="답변입니다."
              key={index}
              index={index}
              current={current}
              onClick={() => (index === current ? setCurrent(-1) : setCurrent(index))}
              state={current === index ? "up" : "down"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
