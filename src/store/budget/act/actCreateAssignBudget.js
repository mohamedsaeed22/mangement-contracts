import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateAssignBudget = createAsyncThunk(
  "assignBudget/actCreateAssignBudget",
  async (budgetArr, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/AssindBudget/Create", budgetArr);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateAssignBudget;
