"use client";

import Button from "../../../components/common/Button";
import TextInput from "../../../components/common/TextInput";
import Link from "next/link";
import React, { useEffect } from "react";

const Page = () => {
  const [validation, setValidation] = React.useState("");
  const [nickname, setNickname] = React.useState("");

  const validationNickname = (nickname: string) => {
    if (nickname.length > 8 || nickname.length < 2)
      setValidation("닉네임은 2자 이상 8자 이하로 설정해주세요.");
    else setValidation("");
  };

  const handleChangeNickname = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value
      .replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]/g, "")
      .replace(/\s/g, "");
    setNickname(cleanedValue);
  }, []);

  useEffect(() => {
    validationNickname(nickname);
  }, [nickname]);

  return (
    <div className="overflow-y-hidden w-[90%] ml-auto mr-auto">
      <div className="flex flex-col h-screen justify-center mt-[30%]">
        <div className="mb-auto">
          <p className="font-bold text-[24px] mb-3">닉네임</p>
          <TextInput
            placeholder="닉네임"
            value={nickname}
            validationMessage={validation}
            handleChangeInput={e => handleChangeNickname(e)}
          />
        </div>

        <Link className="mb-auto mt-auto text-center" href={"nickname"}>
          <Button size="lg">설문 입력하러 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
