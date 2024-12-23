"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import {
  addQuestion,
  initContentList,
  loadAllConversations,
  removeQuestion,
  retryQuestion,
  waitRequest,
} from "@/slice/chatbotSlice";
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

  const [isOpenWelcome, setIsOpenWelcome] = useState(false);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState<ChatbotResponse[]>();
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const [page, setPage] = useState(0);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const messagesStartRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useSearchParams();

  const targetUserNickname = params.get("nickname");
  const targetUserId = parseInt(pathname.split("/")[2]);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  useInfiniteScroll({
    loading,
    hasMore: !chatInfo.last,
    onLoadMore: handleLoadMore,
    targetId: "load-more",
  });

  const handleClickToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeQuestion = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  const handleSendQuestion = useCallback(
    async (questionText?: string) => {
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
      if (!content) return;
      setIsInputDisabled(true);
      dispatch(retryQuestion({ chatBotId: content[questionIndex].chatBotId }));
    },
    [dispatch, content]
  );

  const handleWaitAnswer = useCallback(
    (questionIndex: number) => {
      if (!content) return;

      dispatch(waitRequest({ chatBotId: content[questionIndex].chatBotId }));

      setIsFirstQuestion(false);
    },
    [content, dispatch]
  );

  const handleAskAnotherQuestion = useCallback(
    (questionIndex: number) => {
      if (!content) return;

      dispatch(removeQuestion({ chatBotId: content[questionIndex].chatBotId }));
      setIsFirstQuestion(true);
      setIsInputDisabled(false);
      setShowActionButton(false);
    },
    [content, dispatch]
  );

  useEffect(() => {
    if (isFirstRender) {
      dispatch(loadAllConversations({ targetUserId, page: 0 }));
    } else {
      if (page === 0) return;
      dispatch(loadAllConversations({ targetUserId, page }));
    }
  }, [dispatch, isFirstRender, page, targetUserId]);

  useEffect(() => {
    if (isFirstRender && page === 0 && content) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setIsFirstRender(false);
    }
  }, [content, page, isFirstRender]);

  useEffect(() => {
    if (chatbot.response === "") return;

    setContent(prev => (prev ? [...prev, chatbot] : [chatbot]));

    const showActionButton = chatbot.answerStatus === "NONE";

    setShowActionButton(showActionButton);
    setIsInputDisabled(showActionButton || chatbot.answerStatus === "UNANSWERED_BY_BOT");
  }, [chatbot]);

  useEffect(() => {
    if (page === 0) {
      setContent(contentList);
    } else {
      const scrollContainer = scrollContainerRef.current;
      const oldScrollHeight = scrollContainer?.scrollHeight || 0;

      setContent(prevContent => (prevContent ? [...contentList, ...prevContent] : contentList));

      setTimeout(() => {
        if (scrollContainer) {
          const newScrollHeight = scrollContainer.scrollHeight;
          scrollContainer.scrollTop = newScrollHeight - oldScrollHeight;
        }
      }, 0);
    }
  }, [contentList, page]);

  useEffect(() => {
    if (contentList.length > 0) {
      const lastAnswer = contentList[contentList.length - 1];
      setIsInputDisabled(lastAnswer.answerStatus === "UNANSWERED_BY_BOT");
      setIsFirstQuestion(lastAnswer.answerStatus !== "UNANSWERED_BY_BOT");
    } else {
      setIsInputDisabled(false);
      setIsFirstQuestion(true);
    }
  }, [contentList]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollToBottom(scrollHeight - scrollTop - clientHeight > 100);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initContentList());
      setContent([]);
      setIsFirstQuestion(true);
      setIsInputDisabled(false);
      setShowActionButton(false);
      setPage(0);
      setIsFirstRender(true);
    };
  }, [dispatch]);

  const renderMessages = () => {
    if (!content) return null;
    return content.map((con, index) => (
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
          onAskAnother={() => handleAskAnotherQuestion(index)}
          showActionButtons={showActionButton && index === content.length - 1}
        />
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-light-gray w-full min-h-[92vh] overflow-y-hidden">
      <div className="w-[90%] m-auto flex flex-col-reverse">
        <div className="sticky bottom-4">
          {(isFirstQuestion || !content || content.length === 0) && (
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

        <div
          ref={scrollContainerRef}
          className={`${isFirstQuestion ? "h-[73vh]" : "h-[81vh]"} flex flex-col mt-3 overflow-y-auto scrollbar-hide relative`}
        >
          {loading ? <Loading /> : <div id="load-more" ref={messagesStartRef} />}
          {renderMessages()}
          <div ref={messagesEndRef} />
          {showScrollToBottom && (
            <span
              className="material-symbols-rounded text-4xl text-dark-gray cursor-pointer sticky bottom-2 left-full w-fit z-10"
              onClick={handleClickToBottom}
            >
              arrow_downward
            </span>
          )}
        </div>

        <WelcomeMessage
          nickname={targetUserNickname ?? ""}
          isOpen={isOpenWelcome}
          onToggle={() => setIsOpenWelcome(!isOpenWelcome)}
        />
      </div>
    </div>
  );
};

export default ChatPage;
