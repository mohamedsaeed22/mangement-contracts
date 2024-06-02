import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actCreateSupervisor = createAsyncThunk(
  "supervisor/actCreateSupervisor",
  async (supervisor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Supervisor/create", supervisor);
      return res.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateSupervisor;
