import { createSlice } from "@reduxjs/toolkit";
import actCreateConsultant from "./act/actCreateConsultant";
import actGetConsultantByProjectId from "./act/actGetConsultants";
import actDeleteConsultant from "./act/actDeleteConsultant";
import actGetConsultants from "./act/actGetConsultants";
import actUpdateConsultant from "./act/actUpdateConsultant";

const initialState = {
  consultants: [],
  loading: false,
  error: null,
};

const consultantSlice = createSlice({
  name: "contractor",
  initialState,
  reducers: {
    filterConsultants: (state, { payload }) => {
      state.consultants = state.consultants.filter(
        (el) => el.id !== `${payload}`
      );
    },
  },
  extraReducers: (builder) => {
    // get all consultants
    builder.addCase(actGetConsultants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetConsultants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.consultants = payload;
    });
    builder.addCase(actGetConsultants.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // create consultant
    builder.addCase(actCreateConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.consultants.push({ ...payload, totalProjects: 0 });
    });
    builder.addCase(actCreateConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(actUpdateConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.consultants.findIndex(
        (consultant) => consultant.id === payload.id
      );
      if (index !== -1) {
        state.consultants[index] = payload;
      } else {
        console.error("Activity not found");
      }
    });
    builder.addCase(actUpdateConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete consultant
    builder.addCase(actDeleteConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteConsultant.rejected, (state, action) => {
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

export {
  actCreateConsultant,
  actGetConsultantByProjectId,
  actDeleteConsultant,
};

export const { filterConsultants } = consultantSlice.actions;
export default consultantSlice.reducer;
