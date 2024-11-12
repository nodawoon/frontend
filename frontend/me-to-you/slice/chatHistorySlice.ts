import { getChatHistory, getChatState, updateChatbots } from "@/services/chatHistory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: chatHistoryProps = {
  exist: false,
  content: [
    {
      chatBotId: 0,
      question: undefined,
      response: undefined,
      answerStatus: "",
    },
  ],
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadChatState.fulfilled, (state, action) => {
        state.exist = action.payload.data.exist;
      })
      .addCase(loadChatHistory.fulfilled, (state, action) => {
        state.content = action.payload.data.content;
      })
      .addCase(loadChatHistory.rejected, state => {
        state.content = initialState.content;
      })
      .addCase(updateChatHistory.fulfilled, state => {
        console.log(state);
      });
  },
});

export const loadChatState = createAsyncThunk("chatbot/getChatState", async () => {
  const response = await getChatState();
  return response.data;
});

export const loadChatHistory = createAsyncThunk(
  "chatbot/getChatHistory",
  async (params: { status: string; page: number }) => {
    const response = await getChatHistory(params);
    return response.data;
  }
);

export const updateChatHistory = createAsyncThunk(
  "chatbot/updateChatHistory",
  async (params: { chatBotId: number }) => {
    const response = await updateChatbots(params);
    return response.data;
  }
);

export const chatHistoryReducer = chatHistorySlice.reducer;
