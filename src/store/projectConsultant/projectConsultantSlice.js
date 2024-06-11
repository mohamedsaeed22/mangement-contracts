import { createSlice } from "@reduxjs/toolkit";
import actCreateProjectConsultant from "./act/actCreateProjectConsultant";
import actGetConsultantByProjectId from "./act/actGetConsultantByProjectId";
import actDeleteConsultant from "./act/actDeleteConsultant";

const initialState = {
  consultants: [],
  loading: false,
  error: null,
};

const projectConsultantSlice = createSlice({
  name: "projectConsultant",
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

    // create projectConsultant
    builder.addCase(actCreateProjectConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actCreateProjectConsultant.fulfilled,
      (state, { payload }) => {
        state.loading = false;

        const { id, name, phone } = payload;
        state.consultants.push({ id, name, phone });
      }
    );
    builder.addCase(actCreateProjectConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // builder.addCase(actUpdateSupervisor.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   const index = state.consultants.findIndex(
    //     (projectConsultant) => projectConsultant.id === payload.id
    //   );
    //   if (index !== -1) {
    //     state.consultants[index] = payload;
    //   } else {
    //     console.error("Activity not found");
    //   }
    // });
    // builder.addCase(actUpdateSupervisor.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action?.payload === 403) {
    //     state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
    //   } else if (action?.payload === 500) {
    //     state.error = "حدث خطا ما فى السيرفر";
    //   } else {
    //     state.error = action.payload;
    //   }
    // });

    // delete projectConsultant
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

export { actCreateProjectConsultant };

export const { filterConsultants } = projectConsultantSlice.actions;
export default projectConsultantSlice.reducer;
