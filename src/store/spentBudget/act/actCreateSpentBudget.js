import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateSpentBudget = createAsyncThunk(
  "spentBudget/actCreateSpentBudget",
  async (spentArr, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/SpentBudget/create", spentArr);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateSpentBudget;
