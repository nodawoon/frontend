"use client";

import Button from "../../../components/common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";

const Page = () => {
  const userName = useAppSelector(state => state.user.user.nickname);

  return (
    <div className="flex flex-col items-center justify-center mt-[30%]">
      <Image
        src="/images/character.svg"
        alt="캐릭터 이미지"
        width={200}
        height={200}
        className="mb-8"
      />

      {/* 설문 완료 메시지 */}
      <div className="font-bold text-2xl text-center text-black mb-4">
        챗봇 학습용 설문이 완료됐어요.
      </div>

      {/* 사용자 이름과 추가 메시지 */}
      <div className="text-lg text-center text-dark-gray">
        <p>
          <span className="font-bold text-primary">{userName ? `${userName}` : "회원"}</span>
          님의 답을 기반으로
        </p>
        <p>챗봇을 만들고 있어요.</p>
      </div>

      {/* 돌아가기 버튼 */}
      <Link href={ROUTES.HOME} className="mt-[40%] w-full px-8">
        <Button size="lg" className="w-full">
          돌아가기
        </Button>
      </Link>
    </div>
  );
};

export default Page;
