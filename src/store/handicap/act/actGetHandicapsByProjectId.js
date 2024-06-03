import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetHandicapsByProjectId = createAsyncThunk(
  "handicap/actGetHandicapsByProjectId",
  async (projectId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Handicap/browse?projectId=" + projectId);
      console.log(res)
       return res;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export default actGetHandicapsByProjectId;
