"use client";

import Button from "../../../components/common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-y-hidden">
      <div className="flex flex-col h-[100%] justify-center items-center mt-[40%]">
        <Image
          src="/character.svg"
          alt="로고"
          width={175}
          height={175}
          style={{ width: "175px", height: "175px" }}
        />
        <div className="font-bold text-[28px] text-center mt-2">
          <p>설문이 끝났어요.</p>
        </div>

        <div className="text-lg text-center mt-4">
          <p>로그인하시면 설문을 만들어</p>
          <p>친구들에게 보낼 수 있어요.</p>
        </div>
        <Link className="mt-[40%]" href={`/login`}>
          <Button size="lg">내 설문 만들러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
