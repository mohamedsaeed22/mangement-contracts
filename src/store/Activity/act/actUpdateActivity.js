import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actUpdateActivity = createAsyncThunk(
  "Activity/actUpdateActivity",
  async (Activity, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await api.put("api/Activity/update/" + Activity.id, Activity);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateActivity;
