import { getChatHistory, getChatState } from "@/services/chatHistory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: chatState = {
  exist: false,
};

const initialHistoryState: chatHistoryProps = {
  content: [
    {
      chatBotId: 0,
      question: undefined,
      response: undefined,
      answerStatus: "",
    },
  ],
};

const chatStateSlice = createSlice({
  name: "chatState",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadChatState.fulfilled, (state, action) => {
      state.exist = action.payload.data.exist;
    });
  },
});

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: initialHistoryState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadChatHistory.fulfilled, (state, action) => {
        const chatHistoryList = action.payload.data as unknown as {
          chatBotId: number;
          question: string | undefined;
          response: string | undefined;
          answerStatus: string;
        }[];
        state.content = chatHistoryList;
      })
      .addCase(loadChatHistory.rejected, (state, action) => {
        state.content = [
          {
            chatBotId: 0,
            question: undefined,
            response: undefined,
            answerStatus: "",
          },
        ];
      });
  },
});

export const loadChatState = createAsyncThunk("respondent/getChatState", async () => {
  const response = await getChatState();
  return response.data;
});

export const loadChatHistory = createAsyncThunk(
  "respondent/getChatHistory",
  async (params: { status: string; page: number }) => {
    const response = await getChatHistory(params);
    return response.data;
  }
);

export const chatStateReducer = chatStateSlice.reducer;
export const chatHistoryReducer = chatHistorySlice.reducer;
