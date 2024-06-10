import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { actGetSupervisors } from "../../consultant/consultantSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { actGetActivities } from "../../Activity/activitySlice";

const actGetProjectByActivity = createAsyncThunk(
  "project/actGetProjectByActivity",
  async (params, thunkAPI) => {
    console.log(params);
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
      await dispatch(actGetSupervisors()).unwrap();
      await dispatch(actGetActivities()).unwrap();
      const { consultants } = getState().consultant;
      const { activities } = getState().Activity;

      const res = await api.get(
        `api/Project/browse?ActivityId=${params.id}&PageSize=10&Page=${params.page}`
      );
      const enhancedProjects = res.data.data.map((project) => {
        const supervisor = consultants.find(
          (sup) => sup.id === project.consultantId
        );
        const Activity = activities.find((br) => br.id === project.ActivityId);
        return {
          ...project,
          supervisorName: supervisor.name,
          ActivityName: Activity.name,
        };
      });
      return {
        ...res.data,
        data: enhancedProjects,
      };
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjectByActivity;
