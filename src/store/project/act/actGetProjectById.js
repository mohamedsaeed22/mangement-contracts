import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { actGetSupervisors } from "../../supervisor/supervisorSlice";
import { actGetBranches } from "../../branch/branchSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";

const actGetProjectById = createAsyncThunk(
  "project/actGetProjectById",
  async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetSupervisors()).unwrap();
      await dispatch(actGetBranches()).unwrap();
      const { supervisors } = getState().supervisor;
      const { branches } = getState().branch;
      const res = await api.get("api/Project/" + id);
      const supervisor = supervisors.find(
        (sup) => sup.id === res.data.supervisorId
      );
      const supervisorName = supervisor ? supervisor.name : "";
      const branch = branches.find((branch) => branch.id === res.data.branchId);
      const branchName = branch ? branch.name : "";
      res.data.supervisorName = supervisorName;
      res.data.branchName = branchName;
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjectById;
