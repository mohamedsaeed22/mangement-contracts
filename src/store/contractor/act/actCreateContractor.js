import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateContractor = createAsyncThunk(
  "contractor/actCreateContractor",
  async (contractor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Contractor/create", contractor);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateContractor;
