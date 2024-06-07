import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actUpdateProject = createAsyncThunk(
  "project/actUpdateProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.put("api/Project/update/" + project.id, project);

      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actUpdateProject;
