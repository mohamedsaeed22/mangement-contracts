import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteRisk = createAsyncThunk(
  "risk/actDeleteRisk",
  async (riskId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Risk/delete/" + riskId);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteRisk;
