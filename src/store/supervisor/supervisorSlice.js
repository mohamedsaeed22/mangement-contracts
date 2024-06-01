import { createSlice } from "@reduxjs/toolkit";
import actGetSupervisors from "./act/actGetSupervisors";
import actUpdateSupervisor from "./act/actUpdateSupervisor";
import actDeleteSupervisor from "./act/actDeleteSupervisor";
import actCreateSupervisor from "./act/actCreateSupervisor";

const initialState = {
  supervisors: [],
  loading: false,
  error: null,
};

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {
    filterSupervisors: (state, { payload }) => {
      state.supervisors = state.supervisors.filter(
        (s) => s.id !== `${payload}`
      );
    },
  },
  extraReducers: (builder) => {
    // get all supervisors
    builder.addCase(actGetSupervisors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetSupervisors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.supervisors = payload;
    });
    builder.addCase(actGetSupervisors.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // create supervisor
    builder.addCase(actCreateSupervisor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateSupervisor.fulfilled, (state, { payload }) => {
      state.loading = false;
      const { id, name, phone } = payload;
      state.supervisors.push({ id, name, phone });
    });
    builder.addCase(actCreateSupervisor.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update supervisor
    builder.addCase(actUpdateSupervisor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateSupervisor.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.supervisors.findIndex(
        (supervisor) => supervisor.id === payload.id
      );
      if (index !== -1) {
        state.supervisors[index] = payload;
      } else {
        console.error("Branch not found");
      }
    });
    builder.addCase(actUpdateSupervisor.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // delete supervisor
    builder.addCase(actDeleteSupervisor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteSupervisor.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteSupervisor.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export {
  actGetSupervisors,
  actDeleteSupervisor,
  actCreateSupervisor,
  actUpdateSupervisor,
};

export const { filterSupervisors } = supervisorSlice.actions;
export default supervisorSlice.reducer;
