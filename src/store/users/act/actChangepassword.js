import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actChangepassword = createAsyncThunk(
  "user/actChangepassword",
  async (user, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("Users/changePassword", user);
      console.log(res)
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);
export default actChangepassword;
