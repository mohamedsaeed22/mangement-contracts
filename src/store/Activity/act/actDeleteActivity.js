import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actDeleteActivity = createAsyncThunk(
  "Activity/actDeleteActivity",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Activity/delete/" + id);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteActivity;
