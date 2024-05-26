import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  accessToken: Cookies.get("token") || null,
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
      const decodedToken = jwtDecode(payload.accessToken);
      const expirationDate = new Date(decodedToken.exp * 1000);
      Cookies.set("token", payload.accessToken, { expires: expirationDate });
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload?.status === 401 || action?.payload?.status === 404) {
        state.error = "خطا فى اسم المستخدم او كلمة المرور";
      } else if (action?.payload?.status === 500) {
        state.error = "حدث خطا ما فى السرفر";
      }
    });
  },
});

export { actAuthLogin };
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
