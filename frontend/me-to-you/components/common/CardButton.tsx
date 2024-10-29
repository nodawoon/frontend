"use client";

import Link from "next/link";

interface CardButtonProps {
  className?: string;
  page: number;
  title: string;
  text: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  className,
  page,
  title,
  text,
}: CardButtonProps) => {
  const combinedClassName =
    "flex flex-col justify-center h-20 px-3.5 text-base text-black bg-white border border-gray font-bold break-words rounded-lg hover:bg-soft-gray";
  let url: string = "/";

  switch (page) {
    case 1:
      url += "설문";
      break;
    case 2:
      url += "결과";
      break;
    case 3:
      url += "챗봇";
      break;
    case 4:
      url += "채팅";
      break;
  }

  const errorMessage = () => {
    if (page === 1 || page === 2) return;
    alert("아직 준비중입니다.");
  };

  return (
    <Link
      href={page === 1 || page === 2 ? url : ""}
      className={`${combinedClassName} ${className}`}
      onClick={errorMessage}
    >
      <div className="flex w-full justify-between py-0.5 text-lg">
        <div className="w-auto">{title}</div>
        <span className="material-symbols-rounded text-icon">arrow_forward</span>
      </div>
      <div className="py-0.5 text-sm font-light">{text}</div>
    </Link>
  );
};

export default CardButton;
