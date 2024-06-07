import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateHandicap = createAsyncThunk(
  "handicap/actUpdateHandicap",
  async (handicap, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Handicap/Update/" + handicap.id, handicap);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateHandicap;
