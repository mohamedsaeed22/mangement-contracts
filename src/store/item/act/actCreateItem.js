import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actCreateItem = createAsyncThunk(
  "item/actCreateItem",
  async (item, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Item/create", item);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default actCreateItem;
