import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actCreateRisk = createAsyncThunk(
  "risk/actCreateRisk",
  async (risk, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(risk)
    try {
      const res = await api.post("api/Risk/create", risk);
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateRisk;
