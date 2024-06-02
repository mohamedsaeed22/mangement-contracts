import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actCreateCompany = createAsyncThunk(
  "company/actCreateCompany",
  async (company, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/ForeignCompany/create", company);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default actCreateCompany;
