import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetHandicapsByProjectId = createAsyncThunk(
  "handicap/actGetHandicapsByProjectId",
  async (projectId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Handicap/browse?projectId=" + projectId);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetHandicapsByProjectId;
