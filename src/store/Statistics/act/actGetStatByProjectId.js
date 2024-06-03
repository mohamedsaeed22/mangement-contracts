import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetStatByProjectId = createAsyncThunk(
  "statistics/actGetStatByProjectId",
  async (branchId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get(
        "api/ProjectsStatistics/statistics/" + branchId
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export default actGetStatByProjectId;
