import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actCreateBranch = createAsyncThunk(
  "branch/actCreateBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Branch/create");
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateBranch;
