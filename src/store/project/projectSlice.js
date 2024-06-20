import { createSlice } from "@reduxjs/toolkit";
import actGetProjects from "./act/actGetProjects";
import actUpdateProject from "./act/actUpdateProject";
import actGetProjectById from "./act/actGetProjectById";
import actGetProjectByActivity from "./act/actGetProjectByActivity";
import actGetProjectsBySector from "./act/actGetProjectsBySector";
import actGetProjectsByContractorId from "./act/actGetProjectsByContractorId";
import actGetProjectsByConsultantId from "./act/actGetProjectsByConsultantId";

const initialState = {
  projects: [],
  project: {
    id: "07e925c8-589c-44e5-9c16-08dc7ee258c5",
    name: "sdfwf wef rdf ",
    description: "asdfsafd",
    startDate: "2024-05-05T21:00:00",
    endDate: "2024-05-08T21:00:00",
    budget: 333.0,
    spentBudget: 3433.0,
    percentage: 20,
    status: 4,
    ActivityId: "cd3215dd-4dc8-441c-005f-08dc7ee21558",
    supervisorId: "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
    sectorId: "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
    createdAt: "2024-05-28T09:49:39.6672683",
    updatedAt: "0001-01-01T00:00:00",
    updatedBy: "00000000-0000-0000-0000-000000000000",
    createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
  },
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

    // get project by id
    builder.addCase(actGetProjectsByContractorId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actGetProjectsByContractorId.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.projects = payload.data;
        state.totalItems = payload.totalItems;
      }
    );
    builder.addCase(actGetProjectsByContractorId.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload?.response?.status === 400) {
        state.error = "هذا العنوان غير صالح";
      }
    });

    // get project by id
    builder.addCase(actGetProjectsByConsultantId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      actGetProjectsByConsultantId.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.projects = payload.data;
        state.totalItems = payload.totalItems;
      }
    );
    builder.addCase(actGetProjectsByConsultantId.rejected, (state, action) => {
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

export {
  actGetProjects,
  actGetProjectByActivity,
  actGetProjectsBySector,
  actGetProjectsByContractorId,
  actGetProjectsByConsultantId,
};
export const { getProjectById } = projectSlice.actions;
export default projectSlice.reducer;
