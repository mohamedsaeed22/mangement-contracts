import { createSlice } from "@reduxjs/toolkit";
import actCreateRisk from "./act/actCreateRisk";
import actGetRisksByProjectId from "./act/actGetRisksByProjectId";
import actDeleteRisk from "./act/actDeleteRisk";
import actUpdateRisk from "./act/actUpdateRisk";
/**
 * {
    id: '3ef23e6c-6b28-4604-3abb-08dc83c0e298',
    description: 'SF ASDFASDF',
    status: 1,
    projectId: 'ccc7338a-4633-48fb-a43f-08dc83ab7ad8',
    createdAt: '2024-06-03T16:21:29.1619022',
    updatedAt: null,
    updatedBy: null,
    createdBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb'
  }
 * 
 */
const initialState = {
  risks: {
    id: "3ef23e6c-6b28-4604-3abb-08dc83c0e298",
    description: "SF ASDFASDF",
    status: 1,
    projectId: "ccc7338a-4633-48fb-a43f-08dc83ab7ad8",
    createdAt: "2024-06-03T16:21:29.1619022",
    updatedAt: null,
    updatedBy: null,
    createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
  },
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
      if (action.payload) {
        state.error = action.payload;
      }
    });
    // get create risk
    builder.addCase(actCreateRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload.data;
    });
    builder.addCase(actCreateRisk.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // delete risk
    builder.addCase(actDeleteRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload.data;
    });
    builder.addCase(actDeleteRisk.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update risk
    builder.addCase(actUpdateRisk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateRisk.fulfilled, (state, { payload }) => {
      //   state.projects = payload.data;
    });
    builder.addCase(actUpdateRisk.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetRisksByProjectId, actCreateRisk, actDeleteRisk, actUpdateRisk };
export const { getProjectById } = riskSlice.actions;
export default riskSlice.reducer;
