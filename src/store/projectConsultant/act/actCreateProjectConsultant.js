import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateProjectConsultant = createAsyncThunk(
  "projectConsultant/actCreateConsultant",
  async (projectConsultant, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post(
        "api/ProjectConsultant/create",
        projectConsultant
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateProjectConsultant;
