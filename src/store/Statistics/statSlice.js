import { createSlice } from "@reduxjs/toolkit";
import actGetAllStat from "./act/actGetAllStat";
import actGetStatByActivityId from "./act/actGetStatByActivityId";
import actGetStatBySectorId from "./act/actGetStatBySectorId";

const initialState = {
  stats: {},
  loading: false,
  error: null,
};

const supervisorSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    resetStat: (state, action) => {
      state.stats = {};
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
      state.stats = payload;
    });
    builder.addCase(actGetAllStat.rejected, (state, action) => {
      state.loading = false;

      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 404) {
        state.error = "هذه الصفحة غير موجوده";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // get  stat by activityId
    builder.addCase(actGetStatByActivityId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetStatByActivityId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.stats = payload;
    });
    builder.addCase(actGetStatByActivityId.rejected, (state, action) => {
      state.loading = false;

      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 404) {
        state.error = "هذه الصفحة غير موجوده";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    // get stat by sectorId
    builder.addCase(actGetStatBySectorId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetStatBySectorId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.stats = payload;
    });
    builder.addCase(actGetStatBySectorId.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 404) {
        state.error = "هذه الصفحة غير موجوده";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
  },
});

export { actGetAllStat, actGetStatByActivityId, actGetStatBySectorId };
export const { resetStat } = supervisorSlice.actions;
export default supervisorSlice.reducer;
