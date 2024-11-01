"use client";

import Image from "next/image";

interface ResultCardProps {
  className?: string;
  name: string;
  text: string;
  date: string;
  flow?: string;
  onClick?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  className,
  name,
  text,
  date,
  flow,
  onClick,
}: ResultCardProps) => {
  const combinedClassName =
    "flex justify-start h-auto max-w-[100%] px-3.5 text-base text-black bg-white font-bold break-words rounded-lg grow ";

  return (
    <div className={`${combinedClassName} ${className} ` + flow} onClick={onClick}>
      <Image
        className="my-auto rounded-full border border-gray"
        src="/character.svg"
        alt="프로필 이미지"
        width="50"
        height="50"
      />
      <div className={"my-auto flex w-96 flex-col justify-center ml-3 py-3 " + flow}>
        <div className="flex w-full justify-between py-0.5 text-sm font-light">
          <div className="w-auto">{name}</div>
          <div className="w-auto text-sm text-medium-gray">{date}</div>
        </div>
        <p className={"w-full text-left py-0.5 text-m font-light " + flow}>{text}</p>
      </div>
    </div>
  );
};

export default ResultCard;
