interface ChatbotResponse {
  question: string;
  response: string;
}

interface ChatbotResponseState {
  responses: ChatbotResponse[];
}
