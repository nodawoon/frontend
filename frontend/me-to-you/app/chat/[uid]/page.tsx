"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { addQuestion, loadAllConversations, retryQuestion } from "@/slice/chatbotSlice";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import TextInput from "@/components/chat/TextInput";
import QuestionGuide from "@/components/chat/QuestionGuide";
import WelcomeMessage from "@/components/chat/WelcomeMessage";
import MessageBubble from "@/components/chat/MessageBubble";
import Loading from "@/components/common/Loading";

const ChatPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { chatInfo, chatbot, contentList, loading } = useSelector(
    (state: RootState) => state.chatbot
  );

  const [isOpenWelcome, setIsOpenWelcome] = useState(true);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState<ChatbotResponse[]>(contentList);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showActionButton, setShowActionButton] = useState(true);
  const [page, setPage] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useSearchParams();

  const targetUserNickname = params.get("nickname");
  const targetUserId = parseInt(pathname.split("/")[2]);

  const handleChangeQuestion = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  useInfiniteScroll({
    loading,
    hasMore: !chatInfo.first,
    onLoadMore: handleLoadMore,
    targetId: "load-more",
  });

  const handleSendQuestion = useCallback(
    async (questionText?: string) => {
      setShowActionButton(false);
      const currentQuestion = questionText ?? question;
      if (currentQuestion.trim() === "") return;

      setIsInputDisabled(true);
      setIsFirstQuestion(false);
      dispatch(addQuestion({ targetUserId, question: currentQuestion }));
      setQuestion("");
    },
    [dispatch, question, targetUserId]
  );

  const handleRetryQuestion = useCallback(
    (questionIndex: number) => {
      setShowActionButton(false);
      setIsInputDisabled(true);
      dispatch(retryQuestion({ chatBotId: content[questionIndex].chatBotId }));
    },
    [dispatch, content]
  );

  const handleWaitAnswer = useCallback(
    (questionIndex: number) => {
      const waitingMessage: ChatbotResponse = {
        chatBotId: chatbot.chatBotId,
        isQuestionIncluded: false,
        limitCount: 0,
        question: content[questionIndex].question,
        response: `${targetUserNickname} 님의 답변을 기다리고 있어요...`,
        answerStatus: null,
      };
      setContent(prev => [...prev, waitingMessage]);
      setShowActionButton(false);
      setIsInputDisabled(true);
      setIsFirstQuestion(false);
    },
    [chatbot.chatBotId, content, targetUserNickname]
  );

  const handleAskAnotherQuestion = useCallback(() => {
    setShowActionButton(false);
    setIsFirstQuestion(true);
    setIsInputDisabled(false);
  }, []);

  useEffect(() => {
    setContent(prev => [...prev, chatbot]);
    const showActionButton = chatbot.answerStatus === "UNANSWERED_BY_BOT";
    setShowActionButton(showActionButton);
    setIsInputDisabled(showActionButton);
  }, [chatbot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [content]);

  useEffect(() => {
    dispatch(loadAllConversations({ targetUserId, page }));
  }, [dispatch, page, targetUserId]);

  useEffect(() => {
    setContent(contentList);
  }, [contentList]);

  const renderMessages = () =>
    content.map((con, index) => (
      <React.Fragment key={index}>
        <MessageBubble
          text={con.question || (content[index] && content[index].question)}
          isUser={true}
        />
        <MessageBubble
          text={con.response || (content[index] && content[index].response)}
          isUser={false}
          answerStatus={con.answerStatus}
          onRetry={() => handleRetryQuestion(index)}
          onWait={() => handleWaitAnswer(index)}
          onAskAnother={handleAskAnotherQuestion}
          showActionButtons={showActionButton}
        />
      </React.Fragment>
    ));

  return (
    <div className="bg-light-gray w-full min-h-[92vh]">
      {loading ? <Loading /> : <div id="load-more" />}
      <div className="w-[90%] m-auto flex flex-col">
        <WelcomeMessage
          nickname={targetUserNickname ?? ""}
          isOpen={isOpenWelcome}
          onToggle={() => setIsOpenWelcome(!isOpenWelcome)}
        />
        <div
          className={`${isFirstQuestion ? "h-[73vh]" : "h-[81vh]"} flex flex-col mt-3 overflow-y-auto scrollbar-hide`}
        >
          {renderMessages()}
          <div ref={messagesEndRef} />
        </div>
        <div className="sticky bottom-4">
          {(isFirstQuestion || content.length === 0) && (
            <QuestionGuide handleClickQuestionItem={handleSendQuestion} />
          )}
          <TextInput
            value={question}
            placeholder="더 궁금한 것이 있으신가요?"
            handleChangeInput={handleChangeQuestion}
            handleClickEnter={handleSendQuestion}
            disabled={isInputDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
