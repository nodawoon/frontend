import { getRespondentList, getRespondentQuestionList } from "@/services/respondents";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: RespondentState = {
  list: [{ respondentId: 0, respondentNickname: "" }],
};

const initialQuestionState: RespondentQuestionState = {
  list: [{ respondentNickname: "", createdDate: "", response: "" }],
};

const respondentSlice = createSlice({
  name: "respondent",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRespondentList.fulfilled, (state, action) => {
        const list = action.payload.data;
        state = list;
      })
      .addCase(loadRespondentList.rejected, (state, action) => {
        state.list = [{ respondentId: 0, respondentNickname: "" }];
      });
  },
});

const respondentQuestionSlice = createSlice({
  name: "respondentQuestion",
  initialState: initialQuestionState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRespondentQuestionList.fulfilled, (state, action) => {
        const list = action.payload.data;
        state = list;
      })
      .addCase(loadRespondentQuestionList.rejected, (state, action) => {
        state.list = [{ respondentNickname: "", createdDate: "", response: "" }];
      });
  },
});

export const loadRespondentList = createAsyncThunk("respondent/getRespondentList", async () => {
  const response = await getRespondentList();
  return response.data;
});

export const loadRespondentQuestionList = createAsyncThunk(
  "respondent/getRespondentQuestionList",
  async (param: string | string[]) => {
    const response = await getRespondentQuestionList(param);
    return response.data;
  }
);

export const respondentReducer = respondentSlice.reducer;
export const respondentQuestionReducer = respondentQuestionSlice.reducer;
