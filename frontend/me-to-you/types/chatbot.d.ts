type ChatbotAnswerType = "ANSWERED_BY_BOT" | "UNANSWERED_BY_BOT" | "ANSWERED_BY_USER" | null;

interface ChatbotState {
  loading: boolean;
  error: string | undefined;
  contentList: ChatbotResponse[];
  chatInfo: {
    first: boolean;
    last: boolean;
  };
  chatbot: ChatbotResponse;
}

interface ChatbotResponse {
  chatBotId: number;
  question: string;
  response: string;
  isQuestionIncluded: boolean;
  limitCount: number;
  answerStatus: ChatbotAnswerType;
}

interface ChatRoomResponse {
  content: ChatbotResponse[];
  first: boolean;
  last: boolean;
}
