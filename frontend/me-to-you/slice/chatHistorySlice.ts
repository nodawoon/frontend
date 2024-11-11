import { getChatHistory, getChatState } from "@/services/chatHistory";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: chatState = {
  exist: false,
};

const initialHistoryState: chatHistoryProps = {
  list: [
    {
      id: 0,
      question: undefined,
      answer: undefined,
      createdAt: undefined,
      lastModifyDate: undefined,
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
          id: number;
          question: string | undefined;
          answer: string | undefined;
          createdAt: string | undefined;
          lastModifyDate: string | undefined;
        }[];
        state.list = chatHistoryList;
      })
      .addCase(loadChatHistory.rejected, (state, action) => {
        state.list = [
          {
            id: 0,
            question: undefined,
            answer: undefined,
            createdAt: undefined,
            lastModifyDate: undefined,
          },
        ];
      });
  },
});

export const loadChatState = createAsyncThunk("respondent/getChatState", async () => {
  const response = await getChatState();
  return response.data;
});

export const loadChatHistory = createAsyncThunk("respondent/getChatHistory", async () => {
  const response = await getChatHistory();
  return response.data;
});

export const chatStateReducer = chatStateSlice.reducer;
export const chatHistoryReducer = chatHistorySlice.reducer;
