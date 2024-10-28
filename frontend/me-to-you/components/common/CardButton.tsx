"use client";

interface CardButtonProps {
  type?: "submit" | undefined;
  className?: string;
  onClick?: () => void;
  title: string;
  text: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  type,
  className,
  onClick,
  title,
  text,
}: CardButtonProps) => {
  const combinedClassName =
    "flex flex-col justify-center h-20 w-96 px-3.5 text-base text-black bg-white border border-gray font-bold break-words rounded-lg hover:bg-soft-gray";

  return (
    <button
      type={type ? type : "button"}
      className={`${combinedClassName} ${className}`}
      onClick={onClick}
    >
      <div className="flex w-full justify-between py-0.5 text-lg">
        <div className="w-auto">{title}</div>
        <span className="material-symbols-rounded text-icon">arrow_forward</span>
      </div>
      <div className="py-0.5 text-sm font-light">{text}</div>
    </button>
  );
};

export default CardButton;
