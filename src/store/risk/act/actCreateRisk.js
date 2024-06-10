import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateRisk = createAsyncThunk(
  "risk/actCreateRisk",
  async (risk, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await api.post("api/Risk/create", risk);

      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateRisk;
