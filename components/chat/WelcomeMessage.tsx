import Image from "next/image";
import React from "react";

interface WelcomeMessageProps {
  nickname: string;
  isOpen: boolean;
  onToggle: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ nickname, isOpen, onToggle }) => (
  <div className="absolute top-[8vh] bg-white rounded-md p-3 cursor-pointer" onClick={onToggle}>
    <div className="flex justify-between w-full items-start">
      <Image src="/images/chatbot.svg" alt="챗봇 아이콘" width={30} height={30} />
      {isOpen && <p className="text-[12px] font-light text-gray">클릭하면 닫혀요!</p>}
    </div>
    {isOpen && (
      <React.Fragment>
        <p className="mt-4 leading-tight text-sm whitespace-pre-wrap">
          안녕하세요, 저는 {nickname}님의 정보를 학습한 챗봇 입니다 :) <br />
          {nickname}님에게 궁금한 것이 있다면 저에게 대신 물어봐 주세요!
        </p>
        <p className="text-[12px] font-light text-dark-gray mt-2">
          *최선을 다해서 대답하고 있지만, 중요한 질문은 직접 해주세요!
        </p>
      </React.Fragment>
    )}
  </div>
);

export default WelcomeMessage;
