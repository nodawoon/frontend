import {
  getChatHistory,
  getChatState,
  updateChatbots,
  updateResponse,
} from "@/services/chatHistory";
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
      .addCase(loadChatState.rejected, state => {
        state.exist = false;
      })
      .addCase(loadChatHistory.fulfilled, (state, action) => {
        state.content = action.payload.data.content;
      })
      .addCase(loadChatHistory.rejected, state => {
        state.content = initialState.content;
      })
      .addCase(updateChatbotPrompt.fulfilled, state => {
        console.log("propmt 업데이트 성공");
      })
      .addCase(updateChatbotPrompt.rejected, state => {
        console.log("propmt 업데이트 실패");
      })
      .addCase(updateChatResponse.fulfilled, state => {
        console.log("response 업데이트 성공");
      })
      .addCase(updateChatResponse.rejected, state => {
        console.log("response 업데이트 실패");
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

export const updateChatbotPrompt = createAsyncThunk(
  "chatbot/updateChatHistory",
  async (params: { chatBotId: number }) => {
    const response = await updateChatbots(params);
    return response.data;
  }
);

export const updateChatResponse = createAsyncThunk(
  "chatbot/updateChatResponse",
  async (params: { chatBotId: number; params: { answer: string } }) => {
    const response = await updateResponse(params.chatBotId, params.params);
    return response.data;
  }
);

export const chatHistoryReducer = chatHistorySlice.reducer;
