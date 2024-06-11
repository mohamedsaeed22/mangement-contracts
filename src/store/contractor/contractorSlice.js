import { createSlice } from "@reduxjs/toolkit";
import actCreateContractor from "./act/actCreateContractor";
import actGetContractors from "./act/actGetContractors";
import actUpdateContractor from "./act/actUpdateContractor";
import actDeleteContractor from "./act/actDeleteContractor";

const initialState = {
  contractors: [],
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

    // create contractor
    builder.addCase(actCreateContractor.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateContractor.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.contractors.push(payload);
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
      const index = state.contractors.findIndex(
        (consultant) => consultant.id === payload.id
      );
      if (index !== -1) {
        state.contractors[index] = payload;
      } else {
        console.error("Activity not found");
      }
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
};

export const { filterContractors } = contractorSlice.actions;
export default contractorSlice.reducer;
