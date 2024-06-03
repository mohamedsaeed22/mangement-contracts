import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetRisksByProjectId = createAsyncThunk(
  "risk/actGetRisksByProjectId",
  async (projectId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Risk/browse?projectId=" + projectId);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actGetRisksByProjectId;
