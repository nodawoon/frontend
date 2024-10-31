import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import surveyResponseReducer from "./responseSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    surveyResponse: surveyResponseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
