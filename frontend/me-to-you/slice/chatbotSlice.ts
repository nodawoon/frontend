import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuestion, getAllConversations } from "@/services/chatbot";
import { MESSAGES } from "@/constants/messages";

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
    question: "",
    response: "",
    isQuestionIncluded: true,
    limitCount: 0,
    answerStatus: null,
  },
};

export const loadAllConversations = createAsyncThunk(
  "chatbot/getAllConversations",
  async ({ targetUserId, page }: { targetUserId: number; page: number }) => {
    const response = await getAllConversations(targetUserId, page);
    return response.data;
  }
);

export const addQuestion = createAsyncThunk(
  "chatbot/createQuestion",
  async ({ targetUserId, question }: { targetUserId: number; question: string }) => {
    const response = await createQuestion(targetUserId, question);
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

        state.contentList = content.reverse().map(con => {
          return {
            chatBotId: con.chatBotId,
            question: con.question,
            response:
              con.answerStatus === "UNANSWERED_BY_BOT" ? MESSAGES.UNANSWERED_BY_BOT : con.response,
            isQuestionIncluded: con.isQuestionIncluded,
            limitCount: con.limitCount,
            answerStatus: con.answerStatus,
          };
        });

        state.loading = false;
      })
      .addCase(loadAllConversations.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addQuestion.pending, state => {
        // state.loading = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.chatbot =
          action.payload.data.answerStatus === "UNANSWERED_BY_BOT"
            ? { ...action.payload.data, response: MESSAGES.UNANSWERED_BY_BOT }
            : action.payload.data;
        state.loading = false;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatbotReducer = chatbotSlice.reducer;
