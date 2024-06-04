import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actUpdateRisk = createAsyncThunk(
  "risk/actUpdateRisk",
  async (risk, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Risk/Update/" + risk.id, risk);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateRisk;
