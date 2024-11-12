import { clientInstance } from "@/libs/http-client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialResponses = Array(30).fill({
  question: "",
  response: "",
});

const initialState: ChatbotResponseState = {
  responses: initialResponses,
};

const submitChatbotResponse = createAsyncThunk(
  "chatbotResponse/submitChatbotResponse",
  async (chatbotResponse: ChatbotResponseState) => {
    const response = await clientInstance.post("/self-survey", chatbotResponse);
    return response.data;
  }
);

const chatbotResponseSlice = createSlice({
  name: "chatbotResponse",
  initialState,
  reducers: {
    addResponse: (
      state,
      action: PayloadAction<{ idx: number; question: string; response: string }>
    ) => {
      const { idx, question, response } = action.payload;

      if (idx >= 0 && idx < state.responses.length) {
        state.responses[idx] = { question, response };
      }
    },
    clearResponses: state => {
      state.responses = initialResponses;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitChatbotResponse.fulfilled, state => {
        state.responses = initialResponses;
      })
      .addCase(submitChatbotResponse.rejected, (state, action) => {
        console.info(action.error.message);
      });
  },
});

export const { addResponse } = chatbotResponseSlice.actions;
export default chatbotResponseSlice.reducer;
