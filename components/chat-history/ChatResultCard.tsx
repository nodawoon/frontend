interface CardProps {
  className?: string;
  question: string;
  answer: string;
  index: number;
  current: number;
  onClick: () => void;
  state: string;
  responser: string;
}

const ChatResultCard: React.FC<CardProps> = ({
  className,
  question,
  answer,
  index,
  current,
  onClick,
  state,
  responser,
}: CardProps) => {
  const combinedClassName =
    "bg-light-gray flex flex-col justify-evenly w-full rounded-md h-auto px-3 break-all " +
    className;
  return (
    <div className={combinedClassName} key={index}>
      <p className="flex justify-between my-2 ml-2">
        <span>Q.&nbsp;</span>
        <span className={"text-md grow " + (index !== current ? "truncate" : "")}>{question}</span>
        <span
          className="material-symbols-rounded text-icon w-6 ml-1 cursor-pointer"
          onClick={() => onClick()}
        >
          {"keyboard_arrow_" + state}
        </span>
      </p>
      <p className={"text-sm font-light mb-2 flex pl-0.5 " + (index !== current ? "hidden" : "")}>
        <span className="material-symbols-rounded text-icon self-right mr-1">{responser}</span>
        <span className="self-center">{answer}</span>
        <span className="material-symbols-rounded text-icon w-6 ml-1">&nbsp;</span>
      </p>
    </div>
  );
};

export default ChatResultCard;
