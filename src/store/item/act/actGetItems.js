import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actGetItems = createAsyncThunk("item/actGetItems", async (_, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await api.get("api/Item/browse");
    console.log(res)
    return res;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error);
  }
});

export default actGetItems;
