"use client";

import Image from "next/image";

interface ResultCardProps {
  type?: "submit" | undefined;
  className?: string;
  profile: string;
  onClick?: () => void;
  name: string;
  text: string;
  date: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  type,
  className,
  profile,
  onClick,
  name,
  text,
  date,
}: ResultCardProps) => {
  const combinedClassName =
    "flex justify-start h-20 w-96 px-3.5 text-base text-black bg-white border border-gray font-bold break-words rounded-lg hover:bg-soft-gray";

  return (
    <button
      type={type ? type : "button"}
      className={`${combinedClassName} ${className}`}
      onClick={onClick}
    >
      <Image
        className="my-auto bg-black rounded-full"
        src={profile}
        alt="프로필 이미지"
        width="50"
        height="50"
      />
      <div className="my-auto flex w-full flex-col justify-center ml-3">
        <div className="flex w-full justify-between py-0.5 text-sm font-light">
          <div className="w-auto">{name}</div>
          <div className="w-auto text-sm text-medium-gray">{date}</div>
        </div>
        <span className="text-left py-0.5 text-m font-light">{text}</span>
      </div>
    </button>
  );
};

export default ResultCard;
