"use client";

import React from "react";
import Image from "next/image";

const SocialLoginButton: React.FC = () => {
  const handleClickKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const handleClickGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  const handleClickNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=Bibliophile`;
  };

  console.info("카카오 리다이렉트", process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI);
  console.info("구글 리다이렉트", process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI);
  console.info("네이버 리다이렉트", process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI);

  const renderSocialLoginButton = (type: string) => {
    return (
      <button
        onClick={
          type === "kakao"
            ? handleClickKakaoLogin
            : type === "google"
              ? handleClickGoogleLogin
              : handleClickNaverLogin
        }
        className="flex w-[60px] h-[60px] justify-center items-center flex-shrink-0 rounded-full"
      >
        <Image
          src={`/social/${type}.svg`}
          alt="카카오 로그인"
          width="60"
          height="60"
          className="rounded-full"
        />
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-4">
        {renderSocialLoginButton("kakao")}
        {renderSocialLoginButton("google")}
        {renderSocialLoginButton("naver")}
      </div>
    </div>
  );
};

export default SocialLoginButton;
