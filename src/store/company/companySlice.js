import { createSlice } from "@reduxjs/toolkit";
import actGetCompanies from "./act/actGetCompanies";
import actDeleteCompany from "./act/actDeleteCompany";
import actCreateCompany from "./act/actCreateCompany";
import actUpdateCompany from "./act/actUpdateCompany";

const initialState = {
  companies: [],
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    filterCompanies: (state, { payload }) => {
      state.companies = state.companies.filter((c) => c.id !== `${payload}`);
    },
  },
  extraReducers: (builder) => {
    // get all companies
    builder.addCase(actGetCompanies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetCompanies.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.companies = payload;
    });
    builder.addCase(actGetCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create company
    builder.addCase(actCreateCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateCompany.fulfilled, (state, { payload }) => {
      state.loading = false;
      // const { id, name, description } = payload;
      // state.companies.push({ id, name, description });
    });
    builder.addCase(actCreateCompany.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // update company
    builder.addCase(actUpdateCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateCompany.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.companies.findIndex(
        (branch) => branch.id === payload.id
      );
      if (index !== -1) {
        state.companies[index] = payload;
      } else {
        console.error("Branch not found");
      }
    });
    builder.addCase(actUpdateCompany.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // delete company
    builder.addCase(actDeleteCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteCompany.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteCompany.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export {
  actGetCompanies,
  actCreateCompany,
  actDeleteCompany,
  actUpdateCompany,
};
export const { filterCompanies } = companySlice.actions;
export default companySlice.reducer;
