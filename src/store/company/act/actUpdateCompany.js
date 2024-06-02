import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actUpdateCompany = createAsyncThunk(
  "company/actUpdateCompany",
  async (company, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(company);
    try {
      const res = await api.put(
        "api/ForeignCompany/update" + company.id,
        company
      );
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateCompany;
