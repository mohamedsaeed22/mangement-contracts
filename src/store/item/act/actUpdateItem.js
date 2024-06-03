import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actUpdateItem = createAsyncThunk(
  "item/actUpdateItem",
  async (item, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Item/update/" + item.id, item);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateItem;
