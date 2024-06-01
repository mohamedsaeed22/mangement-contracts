import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

import { actGetSupervisors } from "../../supervisor/supervisorSlice";
import { actGetBranches } from "../../branch/branchSlice";

const actGetProjectById = createAsyncThunk(
  "project/actGetProjectById",
  async (id, thunkAPI) => {
    console.log(id);
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetSupervisors()).unwrap();
      await dispatch(actGetBranches()).unwrap();
      const { supervisors } = getState().supervisor;
      const { branches } = getState().branch;
      console.log(branches);

      const res = await api.get("api/Project/" + id);
      console.log(res);
      const supervisor = supervisors.find(
        (sup) => sup.id === res.data.supervisorId
      );
      const supervisorName = supervisor ? supervisor.name : "";

      // Find branch name
      const branch = branches.find((branch) => branch.id === res.data.branchId);
      const branchName = branch ? branch.name : "";

      // Add supervisor name and branch name to res.data
      res.data.supervisorName = supervisorName;
      res.data.branchName = branchName;
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProjectById;
