interface RespondentState {
  list: [{ respondentId: number; respondentNickname: string }];
}

interface RespondentQuestionState {
  list: [{ respondentNickname: string; createdDate: string; response: string }];
}
