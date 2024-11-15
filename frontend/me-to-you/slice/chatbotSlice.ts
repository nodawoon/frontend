import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createQuestion,
  deleteQuestion,
  getAllConversations,
  updateRequest,
  updateRequestToWait,
} from "@/services/chatbot";
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

export const retryQuestion = createAsyncThunk(
  "chatbot/updateRequest",
  async ({ chatBotId }: { chatBotId: number }) => {
    const response = await updateRequest(chatBotId);
    return response.data;
  }
);

export const removeQuestion = createAsyncThunk(
  "chatbot/deleteQuestion",
  async ({ chatBotId }: { chatBotId: number }) => {
    const response = await deleteQuestion(chatBotId);
    return response.data;
  }
);

export const waitRequest = createAsyncThunk(
  "chatbot/updateRequestToWait",
  async ({ chatBotId }: { chatBotId: number }) => {
    const response = await updateRequestToWait(chatBotId);
    return response.data;
  }
);

export const chatbotSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initContentList(state) {
      state.contentList = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAllConversations.pending, state => {
        state.loading = true;
      })
      .addCase(loadAllConversations.fulfilled, (state, action) => {
        const { content, first, last } = action.payload.data;

        state.chatInfo.first = first;
        state.chatInfo.last = last;

        const newContent = content.reverse().map(con => {
          return {
            chatBotId: con.chatBotId,
            question: con.question,
            response:
              con.answerStatus === "NONE"
                ? "죄송합니다. 이 질문에 대해 제가 명확한 답변을 드리기 어려워요.😅"
                : con.answerStatus === "UNANSWERED_BY_BOT"
                  ? "답변을 기다리고 있어요..."
                  : con.response,
            isQuestionIncluded: con.isQuestionIncluded,
            limitCount: con.limitCount,
            answerStatus: con.answerStatus,
          };
        });

        if (state.contentList.length === 0) {
          state.contentList = newContent;
        } else {
          state.contentList = [...newContent, ...state.contentList];
        }

        state.loading = false;
      })
      .addCase(loadAllConversations.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.chatbot =
          action.payload.data.answerStatus === "NONE"
            ? { ...action.payload.data, response: MESSAGES.UNANSWERED_BY_BOT }
            : action.payload.data;
        state.loading = false;
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(retryQuestion.fulfilled, (state, action) => {
        state.chatbot =
          action.payload.data.answerStatus === "NONE"
            ? { ...action.payload.data, response: MESSAGES.UNANSWERED_BY_BOT }
            : action.payload.data;
        state.loading = false;
      })
      .addCase(retryQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(waitRequest.fulfilled, (state, action) => {
        state.chatbot =
          action.payload.data.answerStatus === "UNANSWERED_BY_BOT"
            ? { ...action.payload.data, response: "답변을 기다리고 있어요..." }
            : action.payload.data;
        state.loading = false;
      })
      .addCase(waitRequest.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeQuestion.fulfilled, state => {
        state.loading = false;
      })
      .addCase(removeQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatbotReducer = chatbotSlice.reducer;
export const { initContentList } = chatbotSlice.actions;
