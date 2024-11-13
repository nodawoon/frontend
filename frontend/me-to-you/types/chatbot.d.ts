type ChatbotAnswerType = "ANSWERED_BY_BOT" | "UNANSWERED_BY_BOT" | "ANSWERED_BY_USER" | null;

interface ChatbotState {
  loading: boolean;
  error: string | undefined;
  contentList: ChatContent[];
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
  questionerProfile: QuestionerType;
}

interface ChatContent {
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

interface QuestionerType {
  userId: number;
  email: string;
  nickname: string;
  gender: Gender;
  birthday: string;
  shareUrl: string;
  mbti: MBTI_TYPE;
  profileImage: string;
  oauthServerType: "KAKAO" | "GOOGLE" | "NAVER";
}
