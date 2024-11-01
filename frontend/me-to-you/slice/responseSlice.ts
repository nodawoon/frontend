import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyResponse {
  surveyQuestionId: number;
  response: string[];
}

interface SurveyResponseState {
  respondentNickname: string;
  surveyResponseRequestList: SurveyResponse[];
}

const initialState: SurveyResponseState = {
  respondentNickname: "",
  surveyResponseRequestList: [],
};

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
    clearResponses: state => {
      state.surveyResponseRequestList = [];
    },
  },
});

export const { setRespondentNickname, addResponse, clearResponses } = surveyResponseSlice.actions;
export default surveyResponseSlice.reducer;
