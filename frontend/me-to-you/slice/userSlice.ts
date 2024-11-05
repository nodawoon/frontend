import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSocialLogin } from "@/services/oauth";
import { createUser, deleteUser, getCheckNickname } from "@/services/user";

const initialState: UserState = {
  loading: false,
  error: "",
  isLogin: false,
  isNicknameExist: false,
  isFirst: true,
  user: {
    userId: 0,
    email: "",
    nickname: "",
    gender: "MAN",
    birthday: "",
    mbti: "ISTJ",
    profileImage: "",
    oauthServerType: "KAKAO",
  },
};

export const login = createAsyncThunk(
  "user/login",
  async ({ oauthServerType, code }: { oauthServerType: string; code: string }) => {
    const response = await getSocialLogin(oauthServerType, code);
    return response.data;
  }
);

export const checkNicknameDuplication = createAsyncThunk(
  "user/createCheckNickname",
  async (nickname: string) => {
    const response = await getCheckNickname(nickname);
    return response.data;
  }
);

export const signup = createAsyncThunk("user/signup", async (user: SignupRequest) => {
  const response = await createUser(user);
  return response.data;
});

export const removeUser = createAsyncThunk("user/deleteUser", async () => {
  const response = await deleteUser();
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { email, oauthServerType, isFirst } = action.payload.data;
        state.user.email = email;
        state.user.oauthServerType = oauthServerType;
        state.isFirst = isFirst;
        state.isLogin = true;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkNicknameDuplication.fulfilled, (state, action) => {
        state.isNicknameExist = action.payload.data.exist;
        state.error = undefined;
      })
      .addCase(checkNicknameDuplication.rejected, (state, action) => {
        state.isNicknameExist = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { userId, birthday, gender, nickname, profileImage } = action.payload.data;

        state.user = {
          ...state.user,
          userId,
          birthday,
          gender,
          nickname,
          profileImage,
        };
        state.loading = false;
        state.error = undefined;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeUser.pending, state => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
