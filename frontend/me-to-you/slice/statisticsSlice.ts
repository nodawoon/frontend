import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirstPercent, getKeywordCount, getTimePercent } from "@/services/statistics";

const initialState: StatisticsState = {
  loading: false,
  error: undefined,
  firstPercentList: [],
  keywordCountList: [],
  timePercentList: [],
};

export const loadFirstPercent = createAsyncThunk("user/getFirstPercent", async () => {
  const response = await getFirstPercent();
  return response.data;
});

export const loadKeywordCount = createAsyncThunk("user/getKeywordCount", async () => {
  const response = await getKeywordCount();
  return response.data;
});

export const loadTimePercent = createAsyncThunk("user/getTimePercent", async () => {
  const response = await getTimePercent();
  return response.data;
});

export const statisticsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadKeywordCount.pending, state => {
        state.loading = true;
      })
      .addCase(loadKeywordCount.fulfilled, (state, action) => {
        state.keywordCountList = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadKeywordCount.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadFirstPercent.pending, state => {
        state.loading = true;
      })
      .addCase(loadFirstPercent.fulfilled, (state, action) => {
        state.firstPercentList = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadFirstPercent.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadTimePercent.pending, state => {
        state.loading = true;
      })
      .addCase(loadTimePercent.fulfilled, (state, action) => {
        state.timePercentList = action.payload.data;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loadTimePercent.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
