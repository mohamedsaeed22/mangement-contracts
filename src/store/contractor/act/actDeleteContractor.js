import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteContractor = createAsyncThunk(
  "contractor/actDeleteContractor",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Contractor/delete/" + id);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteContractor;
