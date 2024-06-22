import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  getAcessToken,
  getRefreshToken,
  getUserRoles,
  setAccessToken,
  setRefreshToken,
} from "../../utils/accessLocalStorage";

const initialState = {
  accessToken: getAcessToken() || null,
  // accessToken: true,
  roles: getUserRoles() || [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, { payload }) => {
      state.loading = false;

      const myToken = payload?.accessToken;
      const myRefreshToken = payload?.refreshToken;
      const myRefreshTokenExp = payload?.expires;
      setAccessToken(myToken, myRefreshTokenExp);
      setRefreshToken(myRefreshToken, myRefreshTokenExp);
      state.accessToken = myToken;
    });

    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;

      if (action?.payload === 401) {
        state.error = "خطا فى اسم المستخدم او كلمة المرور";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else if (action?.payload === "حدث خطا فى الشبكة") {
        state.error = "خطا فى اسم المستخدم او كلمة المرور";
      }
    });
  },
});

export { actAuthLogin };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
