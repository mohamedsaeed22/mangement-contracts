import { createSlice } from "@reduxjs/toolkit";
import actGetProjects from "./act/actGetProjects";
import actUpdateProject from "./act/actUpdateProject";
import actGetProjectById from "./act/actGetProjectById";
import actGetProjectByActivity from "./act/actGetProjectByActivity";
import actGetProjectsBySector from "./act/actGetProjectsBySector";

const initialState = {
  projects: [],
  project: {},
  totalItems: 0,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjectById: (state, action) => {
      state.project = state.projects.find((p) => p.id === action.payload);
    },
  },
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
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // get projects by Activity
    builder.addCase(actGetProjectByActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProjectByActivity.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.projects = payload.data;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjectByActivity.rejected, (state, action) => {
      state.loading = false;
      //
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // get projects by sector
    builder.addCase(actGetProjectsBySector.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProjectsBySector.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.projects = payload.data;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjectsBySector.rejected, (state, action) => {
      state.loading = false;
      //
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // get project by id
    builder.addCase(actGetProjectById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProjectById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.project = payload;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjectById.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload?.response?.status === 400) {
        state.error = "هذا العنوان غير صالح";
      }
    });

    // update project
    builder.addCase(actUpdateProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateProject.fulfilled, (state, action) => {
      state.loading = false;

      if (action?.payload?.id) {
        state.error = "تم تعديل المشروع بنجاح";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(actUpdateProject.rejected, (state, action) => {
      state.loading = false;
      //
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

export { actGetProjects, actGetProjectByActivity, actGetProjectsBySector };
export const { getProjectById } = projectSlice.actions;
export default projectSlice.reducer;
