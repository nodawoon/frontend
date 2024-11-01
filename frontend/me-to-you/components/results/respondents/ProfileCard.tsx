"use client";

import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  className?: string;
  name: string;
  date: string;
  onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className, name, date }: ProfileCardProps) => {
  const combinedClassName = "flex justify-start h-auto max-w-[100%] text-medium-gray grow ";
  return (
    <div className={combinedClassName + className}>
      <Image
        className="my-auto rounded-full border border-gray"
        src="/character.svg"
        alt="프로필 이미지"
        width="50"
        height="50"
      />
      <div className="my-auto flex w-96 flex-col justify-center ml-2 py-3 ">
        <div className="w-auto text-sm">{date}</div>
        <div className="w-full py-0.5 text-sm">
          <span className="font-bold text-[16px] text-black">{name} </span>
          님은 나에 대해 이렇게 생각해요.
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
