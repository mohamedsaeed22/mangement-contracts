import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actDeleteCompany = createAsyncThunk(
  "company/actDeleteCompany",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/ForeignCompany/delete/" + id);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actDeleteCompany;