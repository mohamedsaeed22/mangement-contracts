import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actCreateHandicap = createAsyncThunk(
  "handicap/actCreateHandicap",
  async (handicap, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Handicap/create", handicap);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateHandicap;
