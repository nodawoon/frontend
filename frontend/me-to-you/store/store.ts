import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../slice/questionSlice";
import surveyResponseReducer from "../slice/responseSlice";
import { userReducer } from "@/slice/userSlice";
import { respondentReducer } from "@/slice/respondentsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
    respondents: respondentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
