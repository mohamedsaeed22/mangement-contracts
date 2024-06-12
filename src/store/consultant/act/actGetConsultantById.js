import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetConsultantById = createAsyncThunk(
  "consultant/actGetConsultantById",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Consultant/" + id);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetConsultantById;
