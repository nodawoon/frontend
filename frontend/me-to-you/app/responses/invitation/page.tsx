import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-y-hidden">
      <div className="flex flex-col h-[100%] justify-center items-center mt-[30%]">
        <Image
          src="/character.svg"
          alt="로고"
          width={175}
          height={175}
          className="border-2 border-light-gray rounded-full"
          style={{ width: "175px", height: "175px" }}
        />
        <div className="font-bold text-[28px] text-center mt-2">
          <p>김싸피님이 보낸</p>
          <p>
            <span className="text-primary">소개</span> 요청이에요.
          </p>
        </div>

        <div className="text-lg text-center mt-4">
          <p>내가 본 친구의 모습을 설문을 통해</p>
          <p>친구에게 알려줄 수 있어요.</p>
        </div>
        <Link className="mt-[40%]" href={"nickname"}>
          <Button size="lg">닉네임 설정하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
