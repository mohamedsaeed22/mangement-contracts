import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetBranches = createAsyncThunk(
  "branch/actGetBranches",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Branch/browse");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actGetBranches;
