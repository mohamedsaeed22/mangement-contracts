import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteProjectConsultant = createAsyncThunk(
  "projectConsultant/actDeleteProjectConsultant",
  async (obj, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete(
        "api/ProjectConsultant/delete/" + obj.projectId + "/" + obj.consultantId
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteProjectConsultant;
