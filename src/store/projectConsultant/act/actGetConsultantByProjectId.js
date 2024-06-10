import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetConsultantByProjectId = createAsyncThunk(
  "consultant/actGetConsultantByProjectId",
  async (projectId, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.get(
        "api/ProjectConsultant/browse/project/" + projectId
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetConsultantByProjectId;
