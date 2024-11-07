"use client";

import { useParams } from "next/navigation";
import Button from "../../../../components/common/Button";
import TextInput from "../../../../components/common/TextInput";
import Link from "next/link";
import React, { useEffect } from "react";

const Page = () => {
  const [validation, setValidation] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const param = useParams();
  const [screenSize, setScreenSize] = React.useState("small");

  useEffect(() => {
    const updateSize = () => {
      const width = window.screen.width;
      const height = window.screen.height;

      if (width >= 1920 && height >= 1080) {
        setScreenSize("large");
      } else if (width >= 1366 && height >= 768) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [screenSize]);

  const validationNickname = (nickname: string) => {
    if (nickname.length > 8 || nickname.length < 2)
      setValidation("닉네임은 2자 이상 8자 이하로 설정해주세요.");
    else setValidation("");
  };

  const handleChangeNickname = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleanedValue = e.target.value.replace(/\s/g, "");

      const maxLen = () => {
        if (/^[a-zA-Z]+$/.test(cleanedValue)) {
          return 16;
        } else if (
          /[a-zA-Z]/.test(cleanedValue) &&
          /[가-힣!@#$%^&*(),.?":{}|<>]/.test(cleanedValue)
        ) {
          return 12;
        } else {
          return 6;
        }
      };
      const validatedValue = cleanedValue.slice(0, maxLen());

      if (validatedValue.length > nickname.length) {
        setNickname(validatedValue);
      } else {
        setNickname(prev => validatedValue);
      }
    },
    [nickname]
  );

  useEffect(() => {
    validationNickname(nickname);
  }, [nickname]);

  return (
    <div
      className={`overflow-y-hidden w-[90%] mx-auto flex flex-col justify-start relative ${screenSize === "large" ? "h-[90vh]" : screenSize === "medium" ? "h-[85vh]" : "h-[80vh]"}`}
    >
      <div className="mt-10">
        <p className="font-bold text-[24px] mb-3">
          <span className="text-primary">친구</span>에게 보일 닉네임을 설정하세요!
        </p>
        <TextInput
          placeholder="닉네임"
          value={nickname}
          validationMessage={validation}
          handleChangeInput={e => handleChangeNickname(e)}
          maxLength={16}
        />
      </div>

      {nickname.length >= 2 && nickname.length <= 8 ? (
        <Link
          href={{ pathname: `../responses/${param.value}`, query: { nickname: nickname } }}
          className="w-full max-w-md mx-auto absolute bottom-5 left-0 right-0 text-center"
        >
          <Button size="lg">설문 입력하러 가기</Button>
        </Link>
      ) : nickname.length > 8 ? (
        <div className="w-full max-w-md mx-auto absolute bottom-5 left-0 right-0 text-center">
          <Button size="lg" disabled={true}>
            닉네임이 너무 길어요.
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto absolute bottom-5 left-0 right-0 text-center">
          <Button size="lg" disabled={true}>
            닉네임이 너무 짧아요.
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
