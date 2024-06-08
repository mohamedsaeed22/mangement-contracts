import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actCreateBranch = createAsyncThunk(
  "branch/actCreateBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Branch/create", branch);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateBranch;
