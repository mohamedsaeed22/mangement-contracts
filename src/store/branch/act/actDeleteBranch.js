import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actDeleteBranch = createAsyncThunk(
  "branch/actDeleteBranch",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Branch/delete/" + id);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actDeleteBranch;
