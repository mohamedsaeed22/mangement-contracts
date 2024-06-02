import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetCompanies = createAsyncThunk(
  "company/actGetCompanies",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/ForeignCompany/browse");
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actGetCompanies;
