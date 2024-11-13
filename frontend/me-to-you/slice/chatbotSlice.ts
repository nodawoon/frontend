import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllConversations } from "@/services/chatbot";

const initialState: ChatbotState = {
  loading: false,
  error: undefined,
  contentList: [],
  chatInfo: {
    first: false,
    last: false,
  },
  chatbot: {
    chatBotId: 0,
    question: "string",
    response: "string",
    isQuestionIncluded: true,
    limitCount: 0,
    answerStatus: null,
    questionerProfile: {
      userId: 0,
      email: "string",
      nickname: "string",
      gender: "MAN",
      birthday: "2024-11-12",
      shareUrl: "string",
      mbti: "INTJ",
      profileImage: "string",
      oauthServerType: "KAKAO",
    },
  },
};

export const loadAllConversations = createAsyncThunk(
  "chatbot/getAllConversations",
  async ({ targetUserId, page }: { targetUserId: number; page: number }) => {
    const response = await getAllConversations(targetUserId, page);
    return response.data;
  }
);

export const chatbotSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAllConversations.pending, state => {
        state.loading = true;
      })
      .addCase(loadAllConversations.fulfilled, (state, action) => {
        const { content, first, last } = action.payload.data;

        state.chatInfo.first = first;
        state.chatInfo.last = last;

        state.contentList = content.map(con => {
          return {
            question: con.question,
            response: con.response,
            isQuestionIncluded: con.isQuestionIncluded,
            limitCount: con.limitCount,
            answerStatus: con.answerStatus,
          };
        });

        state.loading = false;
      })
      .addCase(loadAllConversations.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatbotReducer = chatbotSlice.reducer;
