import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axios from "axios";

const actGetAllStat = createAsyncThunk(
  "statistics/actGetAllStat",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/ProjectsStatistics/statistics");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status || error.message);
      } else {
        return rejectWithValue("خطا غير معروف");
      }
    }
  }
);

export default actGetAllStat;
