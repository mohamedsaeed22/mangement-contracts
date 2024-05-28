import { createSlice } from "@reduxjs/toolkit";
import actGetProjects from "./act/actGetProjects";
import { AxiosHeaders } from "axios";

const initialState = {
  projects: [],
  totalItems: 0,
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all projects
    builder.addCase(actGetProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProjects.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.projects = payload.data;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjects.rejected, (state, action) => {
      state.loading = false;
      console.log(action)
      // console.log(AxiosHeaders(action))
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetProjects };
export default branchSlice.reducer;
