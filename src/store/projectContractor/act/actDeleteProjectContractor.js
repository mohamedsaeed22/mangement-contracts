import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actDeleteProjectContractor = createAsyncThunk(
  "projectConsultant/actDeleteProjectContractor",
  async (obj, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await api.delete(
        "api/ProjectContractor/delete/" + obj.projectId + "/" + obj.contractorId
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actDeleteProjectContractor;
