"use client";

import React, { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import TextInput from "@/components/chat/TextInput";
import QuestionGuide from "@/components/chat/QuestionGuide";
import WelcomeMessage from "@/components/chat/WelcomeMessage";
import MessageBubble from "@/components/chat/MessageBubble";
import { MESSAGES } from "@/constants/messages";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadAllConversations } from "@/slice/chatbotSlice";

interface AnswerType {
  response: string;
  answerStatus: ChatbotAnswerType | null;
}

const ChatPage: React.FC = () => {
  const [isOpenWelcome, setIsOpenWelcome] = useState(true);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [page, setPage] = useState(0);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [visibleActionButtons, setVisibleActionButtons] = useState<boolean[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const { targetUserNickname, targetUserId } = useSelector((state: RootState) => state.chatbot);

  const handleChangeQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  // TODO : API 연동
  const fetchAnswer = useCallback(async (nickname: string): Promise<AnswerType> => {
    const answerStatuses: ChatbotAnswerType[] = [
      "ANSWERED_BY_BOT",
      "UNANSWERED_BY_BOT",
      "ANSWERED_BY_USER",
    ];
    const randomStatus = answerStatuses[Math.floor(Math.random() * answerStatuses.length)];

    let mockResponse = "";
    switch (randomStatus) {
      case "ANSWERED_BY_BOT":
        mockResponse = "나는 치킨을 좋아해!";
        break;
      case "UNANSWERED_BY_BOT":
        mockResponse = MESSAGES.UNANSWERED_BY_BOT(nickname);
        break;
      case "ANSWERED_BY_USER":
        mockResponse = `흠.. 생각해본 적 없는 질문인데 내가 직접 답변을 하자면 나는 뇨끼를 좋아해!`;
        break;
      default:
        break;
    }

    // TODO : API 연동
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      response: mockResponse,
      answerStatus: randomStatus,
    };
  }, []);

  const addMessage = useCallback(
    (newQuestion: string, newAnswer: AnswerType, showActionButton: boolean) => {
      setQuestions(prev => [...prev, newQuestion]);
      setAnswers(prev => [...prev, newAnswer]);
      setVisibleActionButtons(prev => [...prev, showActionButton]);
    },
    []
  );

  const handleSendQuestion = useCallback(
    async (questionText?: string) => {
      const currentQuestion = questionText ?? question;
      if (currentQuestion.trim() === "") return;

      setIsInputDisabled(true);
      setIsFirstQuestion(false);
      setQuestion("");

      addMessage(currentQuestion, { response: "...", answerStatus: null }, false);

      const newAnswer = await fetchAnswer(targetUserNickname);

      setAnswers(prev => {
        const updatedAnswers = [...prev];
        updatedAnswers[updatedAnswers.length - 1] = newAnswer;
        return updatedAnswers;
      });

      const showActionButton = newAnswer.answerStatus === "UNANSWERED_BY_BOT";
      setVisibleActionButtons(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = showActionButton;
        return updated;
      });

      setIsInputDisabled(showActionButton);
    },
    [question, targetUserNickname, fetchAnswer, addMessage]
  );

  const handleRetryQuestion = useCallback(
    async (questionIndex: number) => {
      setVisibleActionButtons(prev => {
        const updated = [...prev];
        updated[questionIndex] = false;
        return updated;
      });
      setIsInputDisabled(true);

      setAnswers(prev => {
        const updatedAnswers = [...prev];
        updatedAnswers[questionIndex] = { response: "...", answerStatus: null };
        return updatedAnswers;
      });

      const newAnswer = await fetchAnswer(targetUserNickname);

      setAnswers(prev => {
        const updatedAnswers = [...prev];
        updatedAnswers[questionIndex] = newAnswer;
        return updatedAnswers;
      });

      const showActionButton = newAnswer.answerStatus === "UNANSWERED_BY_BOT";
      setVisibleActionButtons(prev => {
        const updated = [...prev];
        updated[questionIndex] = showActionButton;
        return updated;
      });

      setIsInputDisabled(showActionButton);
    },
    [targetUserNickname, fetchAnswer]
  );

  const handleWaitAnswer = useCallback(
    (questionIndex: number) => {
      setVisibleActionButtons(prev => {
        const updated = [...prev];
        updated[questionIndex] = false;
        return updated;
      });

      const waitingMessage: AnswerType = {
        response: `${targetUserNickname} 님의 답변을 기다리고 있어요...`,
        answerStatus: null,
      };

      addMessage("기다린다.", waitingMessage, false);

      setIsInputDisabled(true);
      setIsFirstQuestion(false);
    },
    [targetUserNickname, addMessage]
  );

  const handleAskAnotherQuestion = useCallback((questionIndex: number) => {
    setVisibleActionButtons(prev => {
      const updated = [...prev];
      updated[questionIndex] = false;
      return updated;
    });

    setIsFirstQuestion(true);
    setIsInputDisabled(false);
  }, []);

  const handleClickQuestionItem = useCallback(
    (questionText: string) => {
      handleSendQuestion(questionText);
    },
    [handleSendQuestion]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions, answers]);

  useEffect(() => {
    dispatch(loadAllConversations({ targetUserId, page }));
  }, [dispatch, page, targetUserNickname, targetUserId]);

  return (
    <div className="bg-light-gray w-full min-h-[92vh]">
      <div className="w-[90%] m-auto flex flex-col">
        <WelcomeMessage
          nickname={targetUserNickname}
          isOpen={isOpenWelcome}
          onToggle={() => setIsOpenWelcome(!isOpenWelcome)}
        />

        <div
          className={`${
            isFirstQuestion ? "h-[73vh]" : "h-[81vh]"
          } flex flex-col mt-3 overflow-y-auto scrollbar-hide`}
        >
          {questions.map((q, index) => (
            <React.Fragment key={index}>
              <MessageBubble text={q} isUser={true} />

              <MessageBubble
                text={answers[index]?.response || "..."}
                isUser={false}
                answerStatus={answers[index]?.answerStatus}
                onRetry={() => handleRetryQuestion(index)}
                onWait={() => handleWaitAnswer(index)}
                onAskAnother={() => handleAskAnotherQuestion(index)}
                showActionButtons={visibleActionButtons[index]}
              />
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-4">
          {(isFirstQuestion || questions.length === 0) && (
            <QuestionGuide handleClickQuestionItem={handleClickQuestionItem} />
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
