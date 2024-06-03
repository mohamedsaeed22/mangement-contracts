import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actDeleteRisk = createAsyncThunk(
  "risk/actDeleteRisk",
  async (riskId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Risk/delete/" + riskId);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actDeleteRisk;
