import { createSlice } from "@reduxjs/toolkit";
import actGetProjects from "./act/actGetProjects";
import { AxiosHeaders } from "axios";
import actGetProjectByBranch from "./act/actGetProjectByBranch";
import actUpdateProject from "./act/actUpdateProject";
import actGetProjectById from "./act/actGetProjectById";

const initialState = {
  projects: [   {
    "id": "07e925c8-589c-44e5-9c16-08dc7ee258c5",
    "name": "sdfwf wef rdf ",
    "description": "asdfsafd",
    "startDate": "2024-05-29T21:00:00",
    "endDate": "2024-05-30T21:00:00",
    "budget": 333.0000,
    "spentBudget": 3433.0000,
    "percentage": 20,
    "status": 4,
    "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
    "supervisorId": "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
    "createdAt": "2024-05-28T09:49:39.6672683",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
},
{
    "id": "66d1ca77-a174-476b-ccc4-08dc7fcbcf3c",
    "name": "werwse",
    "description": "sadfwe3wef",
    "startDate": "2024-05-29T10:38:00.817",
    "endDate": "2024-05-29T10:38:00.817",
    "budget": 2332.0000,
    "spentBudget": 433.0000,
    "percentage": 33,
    "status": 2,
    "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
    "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
    "createdAt": "2024-05-29T13:40:51.1539863",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
},
{
    "id": "655330d8-654f-4a23-ccc5-08dc7fcbcf3c",
    "name": "sadsdf arf ",
    "description": "sadf as",
    "startDate": "2024-05-29T10:38:00.817",
    "endDate": "2024-05-29T10:38:00.817",
    "budget": 23.0000,
    "spentBudget": 12.0000,
    "percentage": 34,
    "status": 3,
    "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
    "supervisorId": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
    "createdAt": "2024-05-29T13:41:20.3696879",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
},
{
    "id": "3ddf2c5e-ba13-4f8e-ccc6-08dc7fcbcf3c",
    "name": "sadsdf arf ",
    "description": "sadf as",
    "startDate": "2024-05-29T10:38:00.817",
    "endDate": "2024-05-29T10:38:00.817",
    "budget": 23.0000,
    "spentBudget": 12.0000,
    "percentage": 34,
    "status": 2,
    "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
    "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
    "createdAt": "2024-05-29T13:41:27.1398059",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
},
{
    "id": "20e9ec06-8590-4bb5-ccc7-08dc7fcbcf3c",
    "name": "smal se",
    "description": "sadf as",
    "startDate": "2024-05-29T10:38:00.817",
    "endDate": "2024-05-29T10:38:00.817",
    "budget": 23.0000,
    "spentBudget": 12.0000,
    "percentage": 34,
    "status": 2,
    "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
    "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
    "createdAt": "2024-05-29T13:41:38.3815755",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
}],
  projectsByBranch: [],
  project: {
    "id": "3ddf2c5e-ba13-4f8e-ccc6-08dc7fcbcf3c",
    "name": "sadsdf arf ",
    "description": "sadf as",
    "startDate": "2024-05-29T10:38:00.817",
    "endDate": "2024-05-29T10:38:00.817",
    "budget": 23.0000,
    "spentBudget": 12.0000,
    "percentage": 34,
    "status": 2,
    "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
    "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
    "createdAt": "2024-05-29T13:41:27.1398059",
    "updatedAt": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
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
      console.log(payload);
      state.projects = payload.data;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjects.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      // console.log(AxiosHeaders(action))
      if (action.payload) {
        state.error = action.payload;
      }
    });
    // get projects by branch
    builder.addCase(actGetProjectByBranch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProjectByBranch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.projectsByBranch = payload.data;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjectByBranch.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      // console.log(AxiosHeaders(action))
      if (action.payload) {
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
      console.log(payload)
      state.project = payload;
      // state.totalItems = payload.totalItems;
    });
    builder.addCase(actGetProjectById.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      // console.log(AxiosHeaders(action))
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update project
    builder.addCase(actUpdateProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateProject.fulfilled, (state, { payload }) => {
      state.loading = false;
      //  const index = state.projects.data.findIndex(
      //   (project) => project.id === payload.id
      // );
      // if (index !== -1) {
      //   state.projects.data[index] = payload;
      // } else {
      //   console.error("project not found");
      // }
    });
    builder.addCase(actUpdateProject.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      // console.log(AxiosHeaders(action))
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetProjects, actGetProjectByBranch };
export const { getProjectById } = projectSlice.actions;
export default projectSlice.reducer;
