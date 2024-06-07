import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateRisk = createAsyncThunk(
  "risk/actUpdateRisk",
  async (risk, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Risk/Update/" + risk.id, risk);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateRisk;
