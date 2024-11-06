interface StatisticsState {
  loading: boolean;
  error: string | undefined;
  keywordCountList: {
    responseDetail: string;
    count: number;
  }[];
}
