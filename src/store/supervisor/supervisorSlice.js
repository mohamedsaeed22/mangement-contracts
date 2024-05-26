import { createSlice } from "@reduxjs/toolkit";
 import actGetSupervisors from "./act/actGetSupervisors";

const initialState = {
  supervisors: [],
  loading: false,
  error: null,
};

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all supervisors
    builder.addCase(actGetSupervisors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetSupervisors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.supervisors = payload;
    });
    builder.addCase(actGetSupervisors.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetSupervisors };
export default supervisorSlice.reducer;
