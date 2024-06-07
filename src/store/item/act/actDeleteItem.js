import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteItem = createAsyncThunk(
  "item/actDeleteItem",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Item/delete/" + id);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteItem;
