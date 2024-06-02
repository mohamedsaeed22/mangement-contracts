import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actUpdateProject = createAsyncThunk(
  "project/actUpdateProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Project/update/" + project.id, project);
      console.log(res)
      return res;
    } catch (error) {
      console.log(error)
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actUpdateProject;
