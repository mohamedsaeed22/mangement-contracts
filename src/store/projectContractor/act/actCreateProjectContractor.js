import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateProjectContractor = createAsyncThunk(
  "projectConctractor/actCreateProjectContractor",
  async (contractor, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/ProjectContractor/create", contractor);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateProjectContractor;
