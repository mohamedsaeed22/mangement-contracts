import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetAllStat = createAsyncThunk(
  "statistics/actGetAllStat",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/ProjectsStatistics/statistics");
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export default actGetAllStat;
