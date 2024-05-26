import { createSlice } from "@reduxjs/toolkit";
import actGetBranches from "./act/actGetBranches";
import actCreateBranch from "./act/actCreateBranch";
import actDeleteBranch from "./act/actDeleteBranch";
import actUpdateBranch from "./act/actUpdateBranch";

const initialState = {
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all branches
    builder.addCase(actGetBranches.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetBranches.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.branches = payload;
    });
    builder.addCase(actGetBranches.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // create branche
    builder.addCase(actCreateBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateBranch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.branches = payload.accessToken;
    });
    builder.addCase(actCreateBranch.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update branche
    builder.addCase(actUpdateBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateBranch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.branches = payload.accessToken;
    });
    builder.addCase(actUpdateBranch.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // delete branche
    builder.addCase(actDeleteBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteBranch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.branches = payload.accessToken;
    });
    builder.addCase(actDeleteBranch.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actCreateBranch, actDeleteBranch, actGetBranches, actUpdateBranch };
export default branchSlice.reducer;
