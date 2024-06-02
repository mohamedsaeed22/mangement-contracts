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
  reducers: {
    filterBranches: (state, { payload }) => {
      state.branches = state.branches.filter((b) => b.id !== `${payload}`);
      console.log(state.branches);
    },
  },
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
      console.log(action);
      // if (action.payload) {
      //   state.error = action.payload;
      // }
    });

    // create branche
    builder.addCase(actCreateBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateBranch.fulfilled, (state, { payload }) => {
      state.loading = false;
      const { id, name, description } = payload;
      state.branches.push({ id, name, description });
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
      const index = state.branches.findIndex(
        (branch) => branch.id === payload.id
      );
      if (index !== -1) {
        state.branches[index] = payload;
      } else {
        console.error("Branch not found");
      }
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
    });
    builder.addCase(actDeleteBranch.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actCreateBranch, actDeleteBranch, actGetBranches, actUpdateBranch };
export const { filterBranches } = branchSlice.actions;
export default branchSlice.reducer;
