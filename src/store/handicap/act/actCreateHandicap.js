import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateHandicap = createAsyncThunk(
  "handicap/actCreateHandicap",
  async (handicap, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Handicap/create", handicap);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateHandicap;
