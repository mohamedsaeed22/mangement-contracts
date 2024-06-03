import { createSlice } from "@reduxjs/toolkit";
import actGetSupervisors from "./act/actGetSupervisors";
import actUpdateSupervisor from "./act/actUpdateSupervisor";
import actDeleteSupervisor from "./act/actDeleteSupervisor";
import actCreateSupervisor from "./act/actCreateSupervisor";

const initialState = {
  supervisors: [
    {
      id: "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
      name: "mostafa",
      phone: "01018205801",
      createdAt: "2024-05-28T09:49:09.3182009",
      updatedAt: "2024-05-29T12:01:09.9385081",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
      name: "ali ",
      phone: "01018205801",
      createdAt: "2024-05-28T12:15:19.5268637",
      updatedAt: "2024-05-28T12:23:24.8224803",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "7c491c54-4106-43c5-ba79-08dc7f08e15f",
      name: "osama",
      phone: "01018205801",
      createdAt: "2024-05-28T14:25:29.735027",
      updatedAt: "2024-05-29T12:01:46.5021573",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "00aa2310-c106-45af-014a-08dc7fd8978a",
      name: "samy",
      phone: "01234574854",
      createdAt: "2024-05-29T15:12:21.1382722",
      updatedAt: "0001-01-01T00:00:00",
      updatedBy: "00000000-0000-0000-0000-000000000000",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
  ],
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
