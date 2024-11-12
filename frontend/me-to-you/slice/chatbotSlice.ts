import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllConversations } from "@/services/chatbot";

const initialState: ChatbotState = {
  loading: false,
  error: undefined,
  targetUserId: 7,
  targetUserNickname: "거니",
  chatList: {
    content: [
      {
        chatBotId: 0,
        question: "",
        response: "",
        isQuestionIncluded: false,
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
    ],
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
        state.chatList.content = content;
        state.chatList.first = first;
        state.chatList.last = last;
        state.loading = false;
      })
      .addCase(loadAllConversations.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatbotReducer = chatbotSlice.reducer;
