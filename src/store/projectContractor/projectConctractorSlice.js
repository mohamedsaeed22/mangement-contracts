import { createSlice } from "@reduxjs/toolkit";
// import actCreateConsultant from "./act/actCreateProjectContractor";
import actGetConsultantByProjectId from "./act/actGetConsultantByProjectId";
// import actDeleteConsultant from "./act/actDeleteConsultant";
import actCreateProjectContractor from "./act/actCreateProjectContractor";
import { actDeleteProjectConsultant } from "../projectConsultant/projectConsultantSlice";

const initialState = {
  consultants: [],
  loading: false,
  error: null,
};

const projectConctractorSlice = createSlice({
  name: "projectConctractor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all consultants
    builder.addCase(actGetConsultantByProjectId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actGetConsultantByProjectId.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.consultants = payload;
      }
    );
    builder.addCase(actGetConsultantByProjectId.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // create projectConctractor
    builder.addCase(actCreateProjectContractor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actCreateProjectContractor.fulfilled,
      (state, { payload }) => {
        state.loading = false;
      }
    );
    builder.addCase(actCreateProjectContractor.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete projectConctractor
    builder.addCase(actDeleteProjectConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actDeleteProjectConsultant.fulfilled,
      (state, { payload }) => {
        state.loading = false;
      }
    );
    builder.addCase(actDeleteProjectConsultant.rejected, (state, action) => {
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

export { actCreateProjectContractor, actDeleteProjectConsultant };

export const { filterConsultants } = projectConctractorSlice.actions;
export default projectConctractorSlice.reducer;
