import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actDeleteBranch = createAsyncThunk(
  "branch/actDeleteBranch",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Branch/delete/" + id);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteBranch;
