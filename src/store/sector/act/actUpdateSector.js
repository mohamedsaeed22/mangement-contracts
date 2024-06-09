import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
const actUpdateSector = createAsyncThunk(
  "sector/actUpdateSector",
  async (sector, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Sector/update/" + sector.id, sector);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateSector;
