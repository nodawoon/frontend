interface chatHistoryProps {
  exist: boolean;
  content: array<{
    chatBotId: number;
    question: string | undefined;
    response: string | undefined;
    answerStatus: string;
  }>;
}
