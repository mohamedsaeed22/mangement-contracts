import actAuthLogin from "./act/actAuthLogin";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  getAcessToken,
  getUserRoles,
  setAccessToken,
} from "../../utils/accessLocalStorage";

const roles = [
  // "Admin",
  "ProjectManagement.ReadOnly",
  // "DefaultUserBranch",
  // "SuperAdmin",
];
const initialState = {
  // accessToken: getAcessToken() || null,
  accessToken: true || null,
  // roles: getUserRoles() || roles,
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
      console.log(payload);
      const myToken = payload.accessToken;
      setAccessToken(myToken);
      // console.log(getUserRoles());
      // if (Array.isArray(getUserRoles())) {
      //    state.roles = getUserRoles();
      // } else {
      //    state.roles = [getUserRoles()];
      // }
      // console.log(state.roles);
      state.accessToken = myToken;
    });

    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      console.log(action);
      if (action?.payload === 401) {
        state.error = "خطا فى اسم المستخدم او كلمة المرور";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = "حدث خطا ما فى الشبكة";
      }
    });
  },
});

export { actAuthLogin };
export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
