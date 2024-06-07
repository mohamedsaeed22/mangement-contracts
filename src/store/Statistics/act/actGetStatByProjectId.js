import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetStatByProjectId = createAsyncThunk(
  "statistics/actGetStatByProjectId",
  async (branchId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get(
        "api/ProjectsStatistics/statistics/" + branchId
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetStatByProjectId;
