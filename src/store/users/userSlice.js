import { createSlice } from "@reduxjs/toolkit";
import actChangepassword from "./act/actChangepassword";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // change password
    builder.addCase(actChangepassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actChangepassword.fulfilled, (state, { payload }) => {
      state.loading = false;
    });

    builder.addCase(actChangepassword.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
  },
});

export { actChangepassword };
export default userSlice.reducer;
