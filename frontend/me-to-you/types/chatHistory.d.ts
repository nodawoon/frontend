interface chatState {
  exist: boolean;
}

interface chatHistoryProps {
  list: {
    id: number;
    question: string | undefined;
    answer: string | undefined;
    createdAt: string | undefined;
    lastModifyDate: string | undefined;
  }[];
}
