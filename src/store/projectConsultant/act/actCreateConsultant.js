import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateConsultant = createAsyncThunk(
  "consultant/actCreateConsultant",
  async (consultant, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/ProjectConsultant/create", consultant);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateConsultant;
