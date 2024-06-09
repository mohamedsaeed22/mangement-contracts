import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actGetActivities = createAsyncThunk(
  "Activity/actGetActivities",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Activity/browse");
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetActivities;
