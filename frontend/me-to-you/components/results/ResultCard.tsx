"use client";

import Image from "next/image";

interface ResultCardProps {
  className?: string;
  name: string;
  text: string | string[];
  date: string;
  flow?: string;
  key?: number;
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

  const texts: React.FC<string[]> = (text: string[]) => {
    return (
      <div className="flex">
        {text.map((e, index) => {
          return (
            <div
              key={index}
              className="w-auto rounded-md bg-soft-gray px-2.5 mr-2 font-medium py-0.5 text-sm"
            >
              {e}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`${combinedClassName} ${className} ` + flow} onClick={onClick}>
      <Image
        className="my-auto rounded-full border border-gray w-[50px] h-[50px]"
        src="/character.svg"
        alt="프로필 이미지"
        width="50"
        height="50"
      />
      <div className={"my-auto flex w-96 flex-col justify-center ml-3 py-3 " + flow}>
        <div className="flex w-full justify-between py-0.5 text-sm font-medium">
          <div className="w-auto">{name}</div>
          <div className="w-auto text-sm text-medium-gray">{date}</div>
        </div>
        <div className={"w-full text-left py-0.5 text-m font-light " + flow}>
          {typeof text !== "string" ? texts(text) : text}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
