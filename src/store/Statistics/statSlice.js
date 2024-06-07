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
  reducers: {
    resetStat: (state, action) => {
      state.allStat = {};
      state.projectStat = {};
    },
  },
  extraReducers: (builder) => {
    // get all stat
    builder.addCase(actGetAllStat.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetAllStat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allStat = payload;
    });
    builder.addCase(actGetAllStat.rejected, (state, action) => {
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

    // get  stat by projectid
    builder.addCase(actGetStatByProjectId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetStatByProjectId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.projectStat = payload;
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
export const { resetStat } = supervisorSlice.actions;
export default supervisorSlice.reducer;
