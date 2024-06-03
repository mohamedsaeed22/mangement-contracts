import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetAllStat = createAsyncThunk(
  "statistics/actGetAllStat",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/ProjectsStatistics/statistics");
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actGetAllStat;
