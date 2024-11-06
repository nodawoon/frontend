import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getKeywordCount } from "@/services/statistics";

const initialState: StatisticsState = {
  loading: false,
  error: undefined,
  keywordCountList: [],
};

export const loadKeywordCount = createAsyncThunk("user/getKeywordCount", async () => {
  const response = await getKeywordCount();
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
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
