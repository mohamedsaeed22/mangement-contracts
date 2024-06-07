import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetItems = createAsyncThunk("item/actGetItems", async (_, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await api.get("api/Item/browse");

    return res.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export default actGetItems;
