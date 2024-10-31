import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  questionNumber: number;
}

const initialState: QuestionState = {
  questionNumber: 1,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestionState: (state, action: PayloadAction<number>) => {
      state.questionNumber = action.payload;
    },
  },
});

export const { setQuestionState } = questionSlice.actions;
export default questionSlice.reducer;
