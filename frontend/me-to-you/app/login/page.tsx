import React from "react";
import SocialLoginButton from "@/components/login/SocialLoginButton";
import Image from "next/image";

const Page: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center mb-28">
        <p className="text-5xl font-extra-bold m-14">
          <span className="text-primary">너</span>에게 <span className="text-primary">난</span>
        </p>
        <Image
          src="/character.svg"
          alt="로고이미지"
          width="150"
          height="130"
          style={{ height: "auto" }}
          priority
        />
      </div>
      <SocialLoginButton />
      <p className="font-light text-sm text-medium-gray text-center mt-3">
        아이디, 비밀번호를 입력할 필요 없이
        <br />
        SNS 아이디로 쉽고 빠르게 회원가입 하세요!
      </p>
    </div>
  );
};

export default Page;
