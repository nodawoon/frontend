import React from "react";
import { useAppSelector } from "@/store/hooks";

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  answerStatus?: ChatbotAnswerType;
  onRetry?: () => void;
  onWait?: () => void;
  onAskAnother?: () => void;
  showActionButtons?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isUser,
  answerStatus,
  onRetry,
  onWait,
  onAskAnother,
  showActionButtons = true,
}) => {
  const { chatbot } = useAppSelector(state => state.chatbot);
  return (
    <div className={`w-fit ${isUser ? "ml-auto" : "mr-auto"} mb-4`}>
      <div className={`${isUser ? "bg-primary text-white" : "bg-white"} p-2 rounded-md max-w-sm`}>
        <p className="font-light text-sm whitespace-pre-wrap">{text}</p>
      </div>
      {!isUser && answerStatus === "NONE" && showActionButtons && (
        <div className="mt-1 flex space-x-1 justify-end">
          {chatbot.limitCount > 0 && (
            <button onClick={onRetry} className="bg-white px-2 py-1 rounded-md text-sm font-light">
              다시 질문하기
            </button>
          )}
          <button
            onClick={onAskAnother}
            className="bg-white px-2 py-1 rounded-md text-sm font-light"
          >
            다른 질문하기
          </button>
          <button onClick={onWait} className="bg-white px-2 py-1 rounded-md text-sm font-light">
            기다린다.
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
