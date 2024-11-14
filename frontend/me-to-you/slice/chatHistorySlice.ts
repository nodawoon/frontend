import {
  getChatHistory,
  getChatState,
  updateChatbots,
  updateResponse,
  updateChatbotsRemove,
} from "@/services/chatHistory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: chatHistoryProps = {
  exist: undefined,
  content: [
    {
      chatBotId: 0,
      question: undefined,
      response: undefined,
      isQuestionIncluded: false,
    },
  ],
  first: true,
  last: true,
  number: 0,
  isLoading: false,
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
        state.isLoading = false;
        state.first = action.payload.data.first;
        if (state.first) {
          state.content = action.payload.data.content;
        } else {
          action.payload.data.content.forEach(
            (e: {
              chatBotId: number;
              question: string;
              response: string;
              isQuestionIncluded: boolean;
            }) => {
              state.content.push(e);
            }
          );
        }
        state.last = action.payload.data.last;
        state.number = action.payload.data.number;
      })
      .addCase(loadChatHistory.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadChatHistory.rejected, state => {
        state.isLoading = false;
        state.first = initialState.first;
        state.content = initialState.content;
        state.last = initialState.last;
        state.number = initialState.number;
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

export const updateChatbotPromptRemove = createAsyncThunk(
  "chatbot/updateChatHistoryRemove",
  async (params: { chatBotId: number }) => {
    const response = await updateChatbotsRemove(params);
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
