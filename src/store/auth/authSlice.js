import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getAcessToken, setAccessToken } from "../../utils/accessLocalStorage";

const initialState = {
  user: null,
  accessToken: getAcessToken() || null,
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
      const myToken = payload.data.accessToken;
      setAccessToken(myToken);
      state.accessToken = myToken;
      state.user = payload.data.user;
    });

    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action?.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actAuthLogin };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
