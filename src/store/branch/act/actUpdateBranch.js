import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
 
const actUpdateBranch = createAsyncThunk(
  "branch/actUpdateBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(branch)
    try {
      const res = await api.put("api/Branch/update/" + branch.id, branch);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateBranch;
