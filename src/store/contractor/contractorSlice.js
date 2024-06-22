import { createSlice } from "@reduxjs/toolkit";
import actCreateContractor from "./act/actCreateContractor";
import actGetContractors from "./act/actGetContractors";
import actUpdateContractor from "./act/actUpdateContractor";
import actDeleteContractor from "./act/actDeleteContractor";
import actGetContractorById from "./act/actGetContractorById";

const initialState = {
  contractors: [
    {
      id: "cd3215dd-4dc8-441c-005f-08dc7ee21558",
      name: "مالية",
      description: "ماليه 2023",
      createdAt: "2024-05-28T09:47:46.3592734",
      updatedAt: "2024-05-29T12:00:32.3698791",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
      name: "هندسية",
      description: "هندسية 2023",
      createdAt: "2024-05-28T14:16:58.8999641",
      updatedAt: "2024-05-29T12:00:55.4923748",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
  ],
  contractor: {},
  loading: false,
  error: null,
};

const contractorSlice = createSlice({
  name: "contractor",
  initialState,
  reducers: {
    filterContractors: (state, { payload }) => {
      state.contractors = state.contractors.filter(
        (el) => el.id !== `${payload}`
      );
    },
  },
  extraReducers: (builder) => {
    // get all contractor
    builder.addCase(actGetContractors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetContractors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contractors = payload;
    });
    builder.addCase(actGetContractors.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // get contractor by id
    builder.addCase(actGetContractorById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetContractorById.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.contractor = payload;
    });
    builder.addCase(actGetContractorById.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // create contractor
    builder.addCase(actCreateContractor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateContractor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contractors.push({ ...payload, totalProjects: 0 });
    });
    builder.addCase(actCreateContractor.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(actUpdateContractor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateContractor.fulfilled, (state, { payload }) => {
      state.loading = false;

      // const index = state.contractors.findIndex(
      //   (consultant) => consultant.id === payload.id
      // );
      // if (index !== -1) {
      //   state.contractors[index] = payload;
      // } else {
      //   console.error("Activity not found");
      // }
    });
    builder.addCase(actUpdateContractor.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete contractor
    builder.addCase(actDeleteContractor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteContractor.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteContractor.rejected, (state, action) => {
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
  actCreateContractor,
  actDeleteContractor,
  actUpdateContractor,
  actGetContractors,
  actGetContractorById,
};

export const { filterContractors } = contractorSlice.actions;
export default contractorSlice.reducer;
