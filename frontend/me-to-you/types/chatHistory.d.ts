interface chatState {
  exist: boolean;
}

interface chatHistoryProps {
  content: {
    chatBotId: number;
    question: string | undefined;
    response: string | undefined;
    answerStatus: string;
  }[];
}
