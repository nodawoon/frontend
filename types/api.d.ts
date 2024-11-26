interface ApiResponseType<DATA_TYPE> {
  success: boolean;
  state: boolean;
  data: DATA_TYPE;
  timeStamp: string;
}
