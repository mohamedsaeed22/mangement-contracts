import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateCompany = createAsyncThunk(
  "company/actUpdateCompany",
  async (company, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put(
        "api/ForeignCompany/update" + company.id,
        company
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateCompany;
