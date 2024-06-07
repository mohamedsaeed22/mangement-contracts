import { createSlice } from "@reduxjs/toolkit";
import actCreateHandicap from "./act/actCreateHandicap";
import actGetHandicapsByProjectId from "./act/actGetHandicapsByProjectId";
import actDeleteHandicap from "./act/actDeleteHandicap";
import actUpdateHandicap from "./act/actUpdateHandicap";
/**
 *
  {
    id: 'ddb8be5c-279f-4685-c033-08dc83d02c03',
    description: 'str s ffdsisfsfng',
    status: 1,
    projectId: 'ccc7338a-4633-48fb-a43f-08dc83ab7ad8',
    createdAt: '2024-06-03T16:22:09.4592685',
    updatedAt: null,
    updatedBy: null,
    createdBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb'
  }
 */
const initialState = {
  handicaps: {},
  loading: false,
  error: null,
};

const handicapSlice = createSlice({
  name: "handicap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get handicaps by projectid
    builder.addCase(actGetHandicapsByProjectId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actGetHandicapsByProjectId.fulfilled,
      (state, { payload }) => {
        state.handicaps = payload?.data[0];
      }
    );
    builder.addCase(actGetHandicapsByProjectId.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // get create handicaps
    builder.addCase(actCreateHandicap.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateHandicap.fulfilled, (state, { payload }) => {
      state.projects = payload;
    });
    builder.addCase(actCreateHandicap.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // delete handicap
    builder.addCase(actDeleteHandicap.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteHandicap.fulfilled, (state, { payload }) => {
      //   state.projects = payload;
    });
    builder.addCase(actDeleteHandicap.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update handicap
    builder.addCase(actUpdateHandicap.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateHandicap.fulfilled, (state, { payload }) => {
      //   state.projects = payload;
    });
    builder.addCase(actUpdateHandicap.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export {
  actGetHandicapsByProjectId,
  actCreateHandicap,
  actDeleteHandicap,
  actUpdateHandicap,
};
export const { getProjectById } = handicapSlice.actions;
export default handicapSlice.reducer;
