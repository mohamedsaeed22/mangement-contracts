import { createSlice } from "@reduxjs/toolkit";
import actGetBranches from "./act/actGetBranches";
import actCreateBranch from "./act/actCreateBranch";
import actDeleteBranch from "./act/actDeleteBranch";
import actUpdateBranch from "./act/actUpdateBranch";

const initialState = {
  branches: [
    {
      id: "cd3215dd-4dc8-441c-005f-08dc7ee21558",
      name: "مالية",
      description: "ماليه 2023",
      createdAt: "2024-05-28T09:47:46.3592734",
      updatedAt: "2024-05-29T12:00:32.3698791",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
      name: "هندسية",
      description: "هندسية 2023",
      createdAt: "2024-05-28T14:16:58.8999641",
      updatedAt: "2024-05-29T12:00:55.4923748",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
  ],
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
