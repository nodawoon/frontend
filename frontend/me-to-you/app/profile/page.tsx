"use client";

import React, { useState } from "react";
import ReadOnlyUserInfo from "@/components/common/ReadOnlyUserInfo";
import Image from "next/image";
import Button from "@/components/common/Button";

const user = {
  userId: 0,
  email: "johndoe@gmail.com",
  nickname: "김싸피",
  gender: "MAN",
  birthday: "2024-10-31",
  mbti: "INTJ",
  profileImage: "",
  oauthServerType: "KAKAO",
};

const keys = ["소셜 타입", "이메일", "생년월일", "성별"];
const values = [
  user.oauthServerType === "KAKAO"
    ? "카카오"
    : user.oauthServerType === "GOOGLE"
      ? "구글"
      : "네이버",
  user.email,
  user.birthday,
  user.gender === "MAN" ? "남자" : "여자",
];

const ProfilePage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <div className="flex flex-col">
        {isEdit ? (
          <div></div>
        ) : (
          <div
            className="border border-gray rounded-full w-24 h-24 flex justify-center"
            style={{
              backgroundImage: "url('/character.svg')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>
        )}
      </div>
      <ReadOnlyUserInfo infoKey={keys} infoValue={values} />
      <div className="w-full flex justify-between">
        <p className="text-lg font-bold">닉네임</p>
        <p className="text-lg">{user.nickname}</p>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-lg font-bold">MBTI</p>
        <p className="text-lg">{user.mbti}</p>
      </div>
      <Button size="lg" className="w-full mt-44">
        {isEdit ? "저장하기" : "수정하기"}
      </Button>
    </div>
  );
};

export default ProfilePage;
