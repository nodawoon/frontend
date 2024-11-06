import {
  getRespondentList,
  getRespondentQuestionList,
  getRespondentDetail,
} from "@/services/respondents";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: RespondentState = {
  list: [{ respondentId: 0, respondentNickname: undefined }],
};

const initialQuestionState: RespondentQuestionState = {
  list: [{ respondentNickname: undefined, createdDate: "", response: "" }],
};

const initialDetailState: RespondentDetailState = {
  list: [{ surveyQuestionId: 0, createdDate: "", response: "" }],
};

const respondentSlice = createSlice({
  name: "respondent",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRespondentList.fulfilled, (state, action) => {
        const list = action.payload.data as unknown as {
          respondentId: number;
          respondentNickname: string | undefined;
        }[];
        state.list = list;
      })
      .addCase(loadRespondentList.rejected, (state, action) => {
        state.list = [{ respondentId: 0, respondentNickname: undefined }];
      });
  },
});

const respondentQuestionSlice = createSlice({
  name: "respondentQuestion",
  initialState: initialQuestionState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRespondentQuestionList.fulfilled, (state, action) => {
        const list = action.payload.data as unknown as {
          respondentNickname: string | undefined;
          createdDate: string;
          response: string;
        }[];
        state.list = list;
      })
      .addCase(loadRespondentQuestionList.rejected, (state, action) => {
        state.list = [{ respondentNickname: undefined, createdDate: "", response: "" }];
      });
  },
});

const respondentDetailSlice = createSlice({
  name: "respondentDetail",
  initialState: initialDetailState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadRespondentDetail.fulfilled, (state, action) => {
        const list = action.payload.data as unknown as {
          surveyQuestionId: number;
          createdDate: string;
          response: string;
        }[];
        state.list = list;
      })
      .addCase(loadRespondentDetail.rejected, (state, action) => {
        state.list = [{ surveyQuestionId: 0, createdDate: "", response: "" }];
      });
  },
});

export const loadRespondentList = createAsyncThunk("respondent/getRespondentList", async () => {
  const response = await getRespondentList();
  return response.data;
});

export const loadRespondentQuestionList = createAsyncThunk(
  "respondent/getRespondentQuestionList",
  async (param: string | string[]) => {
    const response = await getRespondentQuestionList(param);
    return response.data;
  }
);

export const loadRespondentDetail = createAsyncThunk(
  "respondent/getRespondentDetail",
  async (param: string | string[]) => {
    const response = await getRespondentDetail(param);
    return response.data;
  }
);

export const respondentReducer = respondentSlice.reducer;
export const respondentQuestionReducer = respondentQuestionSlice.reducer;
export const respondentDetailReducer = respondentDetailSlice.reducer;
