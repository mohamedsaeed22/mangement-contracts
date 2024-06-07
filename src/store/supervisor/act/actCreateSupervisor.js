import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateSupervisor = createAsyncThunk(
  "supervisor/actCreateSupervisor",
  async (supervisor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Supervisor/create", supervisor);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateSupervisor;
