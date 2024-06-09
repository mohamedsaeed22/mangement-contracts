import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetStatBySectorId = createAsyncThunk(
  "statistics/actGetStatBySectorId",
  async (sectorId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get(
        "api/ProjectsStatistics/statistics/sectorId/" + sectorId
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetStatBySectorId;
