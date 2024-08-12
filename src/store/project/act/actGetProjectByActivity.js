import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { actGetActivities } from "../../Activity/activitySlice";
import actGetConsultants from "../../consultant/act/actGetConsultants";
import actGetSectors from "../../sector/act/actGetSectors";

const actGetProjectByActivity = createAsyncThunk(
  "project/actGetProjectByActivity",
  async (params, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
      // await dispatch(actGetConsultants()).unwrap();
      // await dispatch(actGetActivities()).unwrap();
      // await dispatch(actGetSectors()).unwrap();
      // const { consultants } = getState().consultant;
      const { activities } = getState().activity;
      const { sectors } = getState().sector;

      const res = await api.get(
        `api/Project/browse?Search=${params.search}&ActivityId=${params.id}&PageSize=10&Page=${params.page}`
      );

      const enhancedProjects = res.data.map((project) => {
        const sector = sectors.find((con) => con.id === project.sectorId);

        const activity = activities.find((br) => br.id === project.activityId);
        return {
          ...project,
          sectorName: sector.name,
          activityName: activity.name,
        };
      });

      return {
        ...res,
        data: enhancedProjects,
      };
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjectByActivity;
