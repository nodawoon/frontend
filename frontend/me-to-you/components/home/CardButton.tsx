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
      url += "chat";
      break;
    case 4:
      url += "chat-history";
      break;
  }

  return (
    <Link href={url} className={`${combinedClassName} ${className}`}>
      <div className="flex w-full justify-between py-0.5 text-lg">
        <div className="w-auto">{title}</div>
        <span className="material-symbols-rounded text-icon">arrow_forward</span>
      </div>
      <div className="py-0.5 text-sm font-light">{text}</div>
    </Link>
  );
};

export default CardButton;
