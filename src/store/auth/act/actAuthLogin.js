import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axios from "axios";

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/users/Identity/auth", formData);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        return rejectWithValue(error.response?.status|| error.message);
      } else {
        return rejectWithValue("خطا غير معروف");
      }
    }
  }
);

export default actAuthLogin;
