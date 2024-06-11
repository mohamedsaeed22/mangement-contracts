import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateContractor = createAsyncThunk(
  "contractor/actUpdateContractor",
  async (contractor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put(
        "api/Contractor/" + contractor.id,
        contractor
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateContractor;
