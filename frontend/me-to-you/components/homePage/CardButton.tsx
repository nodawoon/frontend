"use client";

import Link from "next/link";
import Swal from "sweetalert2";

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
    "flex flex-col justify-center h-20 px-3.5 text-base text-black bg-white font-bold break-words rounded-lg hover:bg-soft-gray";
  let url: string = "/";

  switch (page) {
    case 1:
      url += "questions";
      break;
    case 2:
      url += "results";
      break;
    case 3:
      url += "chatbot";
      break;
    case 4:
      url += "chatbot/result";
      break;
  }

  const errorMessage = () => {
    if (page === 1 || page === 2) return;
    Swal.fire({
      icon: "info",
      title: "챗봇 개발 중!",
      text: "조금만 기다려주세요..!",
    });
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
