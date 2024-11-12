interface CardProps {
  className?: string;
  question: string;
  index: number;
  current: number;
  onClick: (index: number) => void;
  state: string;
  submit: (value: string) => void;
}

const ChatInputCard: React.FC<CardProps> = ({
  className,
  question,
  index,
  current,
  onClick,
  state,
  submit,
}: CardProps) => {
  const combinedClassName =
    "bg-light-gray flex flex-col justify-evenly w-full rounded-md h-auto px-3 py-2 break-all " +
    className;

  return (
    <div className={combinedClassName} key={index}>
      <p className="flex justify-between ml-2">
        <span>Q.&nbsp;</span>
        <span className={"text-md grow " + (index !== current ? "truncate" : "")}>{question}</span>
        <span
          className={
            "material-symbols-rounded text-icon w-auto ml-1 " +
            (state === "답변하기" ? "text-[11px] self-center text-center" : "h-6")
          }
          onClick={() => onClick(index)}
        >
          {state}
        </span>
      </p>
      <div className={"text-sm font-light flex pl-0.5 mb-1 " + (index !== current ? "hidden" : "")}>
        <textarea
          className="resize-none rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none scrollbar-thin scrollbar-thumb-gray scrollbar-track-soft-gray w-full pb-3 mt-1"
          maxLength={300}
          placeholder="300자 이내로 작성해주세요."
          onChange={e => submit(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatInputCard;
