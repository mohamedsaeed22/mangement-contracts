import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actDeleteBranch = createAsyncThunk(
  "branch/actDeleteBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Branch/update" + branch.id);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actDeleteBranch;
