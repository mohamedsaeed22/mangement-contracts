import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetItems = createAsyncThunk("item/actGetItems", async (_, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await api.get("api/Item/browse");

    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export default actGetItems;
