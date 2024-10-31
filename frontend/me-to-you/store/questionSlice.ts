import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  questionNumber: number;
  isSideBarOpen: boolean;
}

const initialState: QuestionState = {
  questionNumber: 1,
  isSideBarOpen: false,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestionState: (state, action: PayloadAction<number>) => {
      state.questionNumber = action.payload;
    },
    setIsSideBarState: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setQuestionState, setIsSideBarState } = questionSlice.actions;
export default questionSlice.reducer;
