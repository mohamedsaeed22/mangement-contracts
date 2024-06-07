import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateItem = createAsyncThunk(
  "item/actCreateItem",
  async (item, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Item/create", item);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
export default actCreateItem;
