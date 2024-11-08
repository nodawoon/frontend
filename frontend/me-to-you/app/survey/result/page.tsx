"use client";

import Button from "../../../components/common/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ROUTES } from "@/constants/routes";
import { AuthContext } from "@/context/AuthContext";

const Page = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="overflow-y-hidden">
      <div className="flex flex-col min-h-[90%] justify-center items-center mt-[25%]">
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
        {isLoggedIn ? (
          <React.Fragment>
            <div className="text-lg text-center mt-4">
              <p>나에게도 새로운 응답이 왔는지 볼까요?</p>
            </div>
            <Link className="mt-[40%]" href={ROUTES.RESULT}>
              <Button size="lg">결과 보러 가기</Button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="text-lg text-center mt-4">
              <p>로그인하시면 설문을 만들어</p>
              <p>친구들에게 보낼 수 있어요.</p>
            </div>
            <Link className="mt-[40%]" href={ROUTES.LOGIN}>
              <Button size="lg">내 설문 만들러 가기</Button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Page;
