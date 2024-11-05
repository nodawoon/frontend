interface SurveyResponse {
  surveyQuestionId: number;
  response: string[];
}

interface SurveyResponseState {
  shareUrl: string;
  respondentNickname: string;
  surveyResponseRequestList: SurveyResponse[];
}
