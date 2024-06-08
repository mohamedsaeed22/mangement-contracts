import { createSlice } from "@reduxjs/toolkit";
import actCreateRisk from "./act/actCreateRisk";
import actGetRisksByProjectId from "./act/actGetRisksByProjectId";
import actDeleteRisk from "./act/actDeleteRisk";
import actUpdateRisk from "./act/actUpdateRisk";
const initialState = {
  risks: {},
  loading: false,
  error: null,
};

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get risks by projectid
    builder.addCase(actGetRisksByProjectId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetRisksByProjectId.fulfilled, (state, { payload }) => {
      state.risks = payload?.data[0];
    });
    builder.addCase(actGetRisksByProjectId.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    // get create risk
    builder.addCase(actCreateRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload;
    });
    builder.addCase(actCreateRisk.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete risk
    builder.addCase(actDeleteRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload;
    });
    builder.addCase(actDeleteRisk.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // update risk
    builder.addCase(actUpdateRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload;
    });
    builder.addCase(actUpdateRisk.rejected, (state, action) => {
      state.loading = false;
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

export { actGetRisksByProjectId, actCreateRisk, actDeleteRisk, actUpdateRisk };
export const { getProjectById } = riskSlice.actions;
export default riskSlice.reducer;
