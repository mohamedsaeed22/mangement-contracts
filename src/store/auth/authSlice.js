import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  setAccessToken,
  setRefreshToken,
} from "../../utils/accessLocalStorage";
const refreshToken = Cookies.get("refreshToken");
const token = Cookies.get("token");

const initialState = {
  user: null,
  accessToken: token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = false;
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      Cookies.remove("token");
      // Cookies.remove("refreshToken");
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

      const token = payload.accessToken;
      const decodedToken = jwtDecode(token);
      const expirationTime = new Date(decodedToken.exp * 1000);
      Cookies.set("token", token, { expires: expirationTime });
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });

    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      if (
        action?.payload?.response?.status === 401 ||
        action?.payload?.status === 404
      ) {
        state.error = "خطا فى اسم المستخدم او كلمة المرور";
      } else if (action?.payload?.response?.status === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = "حدث خطا فى الشبكة";
      }
    });
  },
});

export { actAuthLogin };
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
