import { getRespondentList } from "@/services/respondents";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: RespondentState = {
  list: [{ respondentId: 0, respondentNickname: "" }],
};

const respondentSlice = createSlice({
  name: "respondent",
  initialState,
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

export const loadRespondentList = createAsyncThunk("respondent/getRespondentList", async () => {
  const response = await getRespondentList();
  return response.data;
});

export const respondentReducer = respondentSlice.reducer;
