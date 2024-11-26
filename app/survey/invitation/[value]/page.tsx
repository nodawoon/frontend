"use client";

import { getUserNickname } from "@/services/share";
import Button from "../../../../components/common/Button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const param = useParams();
  const [screenSize, setScreenSize] = useState("small");

  useEffect(() => {
    const updateSize = () => {
      const width = window.screen.width;
      const height = window.screen.height;

      if (width >= 1920 && height >= 1080) {
        setScreenSize("large"); // 예: 15인치 이상
      } else if (width >= 1366 && height >= 768) {
        setScreenSize("medium"); // 예: 13~14인치
      } else {
        setScreenSize("small"); // 예: 12인치 이하
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getNickname = async () => {
      const value = Array.isArray(param.value) ? param.value[0] : param.value;

      if (typeof value === "string") {
        getUserNickname(value).then(res => {
          setNickname(res.data.data.nickname);
        });
      }
    };

    getNickname();
  }, [param.value]);

  return (
    <div
      className={`overflow-y-hidden flex justify-center items-center ${screenSize === "large" ? "mt-48" : "mt-32"}`}
    >
      <div className="flex flex-col h-full justify-center items-center max-w-md px-4">
        <Image
          src="/images/character.svg"
          alt="로고"
          width={175}
          height={175}
          className="border-2 border-light-gray rounded-full"
          style={{ width: "175px", height: "175px" }}
        />
        <div className="font-bold text-[28px] text-center mt-2">
          <p>{nickname}님이 보낸</p>
          <p>
            <span className="text-primary">설문지</span> 예요.
          </p>
        </div>

        <div className="text-lg text-center mt-4">
          <p>내가 본 친구의 모습을 설문을 통해</p>
          <p>친구에게 알려줄 수 있어요.</p>
        </div>
        <Link className="mt-[40%]" href={`../nickname/${param.value}`}>
          <Button size="lg">닉네임 설정하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
