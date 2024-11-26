interface RespondentState {
  list: array<{ respondentId: number; respondentNickname: string | undefined }>;
}

interface RespondentQuestionState {
  list: array<{ respondentNickname: string | undefined; createdDate: string; response: string }>;
}

interface RespondentDetailState {
  list: array<{ surveyQuestionId: number; createdDate: string; response: string }>;
}
