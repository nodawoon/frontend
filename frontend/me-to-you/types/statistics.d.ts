interface StatisticsState {
  loading: boolean;
  error: string | undefined;
  firstPercentList: {
    surveyQuestionId: 1;
    response: string;
    percent: number;
  }[];
  keywordCountList: {
    responseDetail: string;
    count: number;
  }[];
  timePercentList: {
    surveyQuestionId: 5;
    response: string;
    percent: number;
  }[];
}
