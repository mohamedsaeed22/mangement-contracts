import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: { name: "ali" } | null,
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
      Cookies.set("token", payload.accessToken);
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actAuthLogin };
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
