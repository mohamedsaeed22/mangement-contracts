import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetContractors = createAsyncThunk(
  "contractor/actGetContractors",
  async (projectId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get("api/Contractor/browse/");
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetContractors;
