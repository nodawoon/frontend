interface CardProps {
  className?: string;
  question: string;
  answer: string;
  index: number;
  current: number;
  onClick: () => void;
  state: string;
}

const ChatResultCard: React.FC<CardProps> = ({
  className,
  question,
  answer,
  index,
  current,
  onClick,
  state,
}: CardProps) => {
  const combinedClassName =
    "bg-light-gray flex flex-col justify-evenly w-full rounded-md h-auto px-3 " + className;

  return (
    <div className={combinedClassName} key={index} onClick={() => onClick()}>
      <p className="flex justify-between my-2 ml-2">
        <span className="text-md">Q.&nbsp;{question}</span>
        <span className="material-symbols-rounded text-icon">{"keyboard_arrow_" + state}</span>
      </p>
      <p className={"text-sm text-medium-gray mb-2 flex " + (index !== current ? "hidden" : "")}>
        <span className="material-symbols-rounded text-icon self-center mr-1 ">smart_toy</span>
        <span className="self-center">{answer}</span>
      </p>
    </div>
  );
};

export default ChatResultCard;
