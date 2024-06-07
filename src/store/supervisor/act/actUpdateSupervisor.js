import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateSupervisor = createAsyncThunk(
  "supervisor/actUpdateSupervisor",
  async (supervisor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put(
        "api/Supervisor/update/" + supervisor.id,
        supervisor
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateSupervisor;
