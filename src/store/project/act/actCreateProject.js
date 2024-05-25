import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actCreateProject = createAsyncThunk(
  "project/actCreateProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Project/create");
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateProject;
