import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateConsultant = createAsyncThunk(
  "consultant/actUpdateConsultant",
  async (consultant, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put(
        "api/ProjectConsultant/update/" + consultant.id,
        consultant
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateConsultant;
