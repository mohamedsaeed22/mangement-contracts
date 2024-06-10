import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actCreateActivity = createAsyncThunk(
  "Activity/actCreateActivity",
  async (Activity, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Activity/create", Activity);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateActivity;
