interface chatHistoryProps {
  exist: boolean;
  content: array<{
    chatBotId: number;
    question: string | undefined;
    response: string | undefined;
    isQuestionIncluded: boolean;
  }>;
  first: boolean;
  last: boolean;
  number: number;
  isLoading: boolean;
}
