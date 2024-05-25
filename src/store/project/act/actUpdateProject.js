import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actUpdateProject = createAsyncThunk(
  "project/actUpdateProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Project/update" + project.id, project);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actUpdateProject;
