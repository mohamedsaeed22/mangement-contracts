import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actUpdateHandicap = createAsyncThunk(
  "handicap/actUpdateHandicap",
  async (handicap, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Handicap/Update/" + handicap.id, handicap);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateHandicap;
