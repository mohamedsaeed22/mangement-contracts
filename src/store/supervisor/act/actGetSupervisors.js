import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actGetSupervisors = createAsyncThunk(
  "supervisor/actGetSupervisors",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Supervisor/browse");
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetSupervisors;
