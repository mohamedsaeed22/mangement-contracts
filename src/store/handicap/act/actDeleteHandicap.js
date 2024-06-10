import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteHandicap = createAsyncThunk(
  "handicap/actDeleteHandicap",
  async (handId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Handicap/delete/" + handId);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteHandicap;
