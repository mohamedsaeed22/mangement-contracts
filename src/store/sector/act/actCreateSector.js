import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actCreateSector = createAsyncThunk(
  "sector/actCreateSector",
  async (sector, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Sector/create", sector);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateSector;
