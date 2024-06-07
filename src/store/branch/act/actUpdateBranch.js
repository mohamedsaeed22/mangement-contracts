import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actUpdateBranch = createAsyncThunk(
  "branch/actUpdateBranch",
  async (branch, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await api.put("api/Branch/update/" + branch.id, branch);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateBranch;
