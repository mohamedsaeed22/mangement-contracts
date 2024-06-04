import { createSlice } from "@reduxjs/toolkit";
import actGetAllStat from "./act/actGetAllStat";
import actGetStatByProjectId from "./act/actGetStatByProjectId";

const initialState = {
  allStat: {},
  projectStat: {},
  loading: false,
  error: null,
};

const supervisorSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all stat
    builder.addCase(actGetAllStat.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetAllStat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allStat = payload?.data;
    });
    builder.addCase(actGetAllStat.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload) {
        state.error = action.payload;
      }
    });
    // get  stat by projectid
    builder.addCase(actGetStatByProjectId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetStatByProjectId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.projectStat = payload.data;
    });
    builder.addCase(actGetStatByProjectId.rejected, (state, action) => {
      state.loading = false;

      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetAllStat, actGetStatByProjectId };

export default supervisorSlice.reducer;
