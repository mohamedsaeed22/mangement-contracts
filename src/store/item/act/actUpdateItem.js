import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateItem = createAsyncThunk(
  "item/actUpdateItem",
  async (item, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Item/update/" + item.id, item);
      return res.data
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateItem;
