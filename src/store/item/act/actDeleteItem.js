import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
 
const actDeleteItem = createAsyncThunk(
  "item/actDeleteItem",
  async (id, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete("api/Item/delete/" + id);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actDeleteItem;
