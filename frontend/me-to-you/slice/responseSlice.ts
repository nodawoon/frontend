import { clientInstance } from "@/libs/http-client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyResponse {
  surveyQuestionId: number;
  response: string[];
}

interface SurveyResponseState {
  shareUrl: string;
  respondentNickname: string;
  surveyResponseRequestList: SurveyResponse[];
  error: string | undefined;
}

const initialState: SurveyResponseState = {
  shareUrl: "",
  respondentNickname: "",
  surveyResponseRequestList: [],
  error: "",
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
    setRespondentNickname: (state, action: PayloadAction<string>) => {
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
    removeResponses: state => {
      state.surveyResponseRequestList = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitSurveyResponse.fulfilled, (state, action) => {
        state.shareUrl = "";
        state.respondentNickname = "";
        state.surveyResponseRequestList = [];
        state.error = "";
      })
      .addCase(submitSurveyResponse.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setRespondentNickname, addResponse, removeResponses } = surveyResponseSlice.actions;
export default surveyResponseSlice.reducer;
