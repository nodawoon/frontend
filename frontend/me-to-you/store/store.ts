import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../slice/questionSlice";
import surveyResponseReducer from "../slice/responseSlice";
import { userReducer } from "@/slice/userSlice";
import chatbotQuestionReducer from "@/slice/chatbotQuestionSlice";
import chatbotResponseReducer from "@/slice/chatbotResponseSlice";
import {
  respondentReducer,
  respondentQuestionReducer,
  respondentDetailReducer,
} from "@/slice/respondentsSlice";
import { statisticsReducer } from "@/slice/statisticsSlice";
import { chatHistoryReducer } from "@/slice/chatHistorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
    respondents: respondentReducer,
    respondentsQuestion: respondentQuestionReducer,
    respondentDetail: respondentDetailReducer,
    statistics: statisticsReducer,
    chatbotQuestion: chatbotQuestionReducer,
    chatbotResponse: chatbotResponseReducer,
    chatHistory: chatHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
