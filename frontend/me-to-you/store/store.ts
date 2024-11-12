import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../slice/questionSlice";
import surveyResponseReducer from "../slice/responseSlice";
import { userReducer } from "@/slice/userSlice";
import {
  respondentReducer,
  respondentQuestionReducer,
  respondentDetailReducer,
} from "@/slice/respondentsSlice";
import { statisticsReducer } from "@/slice/statisticsSlice";
import { chatbotReducer } from "@/slice/chatbotSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
    respondents: respondentReducer,
    respondentsQuestion: respondentQuestionReducer,
    respondentDetail: respondentDetailReducer,
    statistics: statisticsReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
