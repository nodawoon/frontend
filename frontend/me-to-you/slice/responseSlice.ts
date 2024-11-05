import { clientInstance } from "@/libs/http-client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SurveyResponseState = {
  shareUrl: "",
  respondentNickname: "",
  surveyResponseRequestList: [],
};

const submitSurveyResponse = createAsyncThunk(
  "surveyResponse/submitSurveyResponse",
  async (surveyResponse: SurveyResponseState) => {
    const response = await clientInstance.post("/survey-responses", surveyResponse);
    return response.data;
  }
);

const surveyResponseSlice = createSlice({
  name: "surveyResponse",
  initialState,
  reducers: {
    addshareUrl: (state, action: PayloadAction<string>) => {
      state.shareUrl = action.payload;
    },
    addRespondentNickname: (state, action: PayloadAction<string>) => {
      state.respondentNickname = action.payload;
    },
    addResponse: (state, action: PayloadAction<SurveyResponse>) => {
      const existingResponseIndex = state.surveyResponseRequestList.findIndex(
        response => response.surveyQuestionId === action.payload.surveyQuestionId
      );

      if (existingResponseIndex !== -1) {
        state.surveyResponseRequestList[existingResponseIndex] = action.payload;
      } else {
        state.surveyResponseRequestList.push(action.payload);
      }
    },
    removeResponse: state => {
      state.surveyResponseRequestList = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitSurveyResponse.fulfilled, state => {
        state.shareUrl = "";
        state.respondentNickname = "";
        state.surveyResponseRequestList = [];
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        console.info(action.error.message);
      });
  },
});

export const { addshareUrl, addRespondentNickname, addResponse, removeResponse } =
  surveyResponseSlice.actions;
export default surveyResponseSlice.reducer;
