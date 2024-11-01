import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../slice/questionSlice";
import surveyResponseReducer from "../slice/responseSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
