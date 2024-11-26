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
import { chatbotReducer } from "@/slice/chatbotSlice";
import { chatHistoryReducer } from "@/slice/chatHistorySlice";
import { imageReducer } from "@/slice/imageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
    respondents: respondentReducer,
    respondentsQuestion: respondentQuestionReducer,
    respondentDetail: respondentDetailReducer,
    statistics: statisticsReducer,
    chatbot: chatbotReducer,
    chatbotQuestion: chatbotQuestionReducer,
    chatbotResponse: chatbotResponseReducer,
    chatHistory: chatHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
