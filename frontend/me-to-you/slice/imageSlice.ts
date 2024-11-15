import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createImage } from "@/services/file";

interface ImageState {
  loading: boolean;
  error: string | null;
  file: string | null;
}

const initialState: ImageState = {
  loading: false,
  error: null,
  file: null,
};

export const addImage = createAsyncThunk("file/createImage", async (formData: FormData) => {
  const response = await createImage(formData);
  return response.data;
});

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addImage.fulfilled, (state, action) => {
        state.file = action.payload.data.url;
        state.loading = false;
      })
      .addCase(addImage.rejected, (state, action) => {
        state.error = action.error.message || "image failed";
        state.loading = false;
      });
  },
});

export const imageReducer = imageSlice.reducer;
