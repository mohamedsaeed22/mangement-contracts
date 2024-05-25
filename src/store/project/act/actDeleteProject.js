import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actDeleteProject = createAsyncThunk(
  "project/actDeleteProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Project/delete" + project.id);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actDeleteProject;
