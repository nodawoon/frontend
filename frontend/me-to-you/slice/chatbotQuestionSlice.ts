import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatbotQuestionState {
  categoryNumber: number;
  isSideBarOpen: boolean;
}

const initialState: ChatbotQuestionState = {
  categoryNumber: 1,
  isSideBarOpen: false,
};

const chatbotQuestionSlice = createSlice({
  name: "chatbotQuestion",
  initialState,
  reducers: {
    setCategoryState: (state, action: PayloadAction<number>) => {
      state.categoryNumber = action.payload;
    },
    setIsSideBarState: (state, action: PayloadAction<boolean>) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setCategoryState, setIsSideBarState } = chatbotQuestionSlice.actions;
export default chatbotQuestionSlice.reducer;
