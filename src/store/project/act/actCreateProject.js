import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actCreateProject = createAsyncThunk(
  "project/actCreateProject",
  async (project, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.post("api/Project/create", project);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actCreateProject;
