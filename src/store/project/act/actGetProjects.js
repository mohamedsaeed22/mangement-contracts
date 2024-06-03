import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import { actGetSupervisors } from "../../supervisor/supervisorSlice";
import { actGetBranches } from "../../branch/branchSlice";

const actGetProjects = createAsyncThunk(
  "project/actGetProjects",
  async (params, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetSupervisors()).unwrap();
      await dispatch(actGetBranches()).unwrap();
      const { supervisors } = getState().supervisor;
      const { branches } = getState().branch;
      const res = await api.get(
        `api/Project/browse?Search=${params.search}&PageSize=10&Page=${params.page}&Status=${params.status}&StartDate=${params.startDate}&EndDate=${params.endDate}&BranchId=${params.BranchId}&SupervisorId=${params.SupervisorId}&SpentBudget=${params.SpentBudget}`
      );

      const enhancedProjects = res.data.data.map((project) => {
        const supervisor = supervisors.find(
          (sup) => sup.id === project.supervisorId
        );
        const branch = branches.find((br) => br.id === project.branchId);
        return {
          ...project,
          supervisorName: supervisor.name,
          branchName: branch.name,
        };
      });
      return {
        ...res.data,
        data: enhancedProjects,
      };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProjects;
