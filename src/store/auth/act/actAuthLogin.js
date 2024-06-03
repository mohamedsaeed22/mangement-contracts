import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/users/Identity/auth", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actAuthLogin;
