interface RespondentState {
  list: { respondentId: number; respondentNickname: string | undefined }[];
}

interface RespondentQuestionState {
  list: { respondentNickname: string | undefined; createdDate: string; response: string }[];
}

interface RespondentDetailState {
  list: { surveyQuestionId: number; createdDate: string; response: string }[];
}
