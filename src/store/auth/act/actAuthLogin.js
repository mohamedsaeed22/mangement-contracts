import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axios from "axios";

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/users/Identity/auth", formData);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("خطا غير معروف");
      }
    }
  }
);

export default actAuthLogin;
