import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const refreshToken = Cookies.get("refreshToken");
const token = Cookies.get("token");

const initialState = {
  user: null,
  accessToken: (token && refreshToken) || null,
  // accessToken: true,
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
      // const decodedToken = jwtDecode(payload.accessToken);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      Cookies.set("token", payload.accessToken, {
        expires: sevenDaysFromNow,
      });
      Cookies.set("refreshToken", payload.refreshToken, {
        expires: sevenDaysFromNow,
      });
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });

    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      console.log(action)
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
