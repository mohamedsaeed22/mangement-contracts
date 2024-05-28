import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
 
const actCreateBranch = createAsyncThunk(
  "branch/actCreateBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;
     try {
      const res = await api.post("api/Branch/create",branch);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actCreateBranch;
