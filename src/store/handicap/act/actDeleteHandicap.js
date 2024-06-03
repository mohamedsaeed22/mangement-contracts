import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actDeleteHandicap = createAsyncThunk(
  "handicap/actDeleteHandicap",
  async (handId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Handicap/delete/" + handId);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actDeleteHandicap;
