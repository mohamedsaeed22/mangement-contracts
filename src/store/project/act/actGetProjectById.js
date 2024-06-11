import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { actGetSupervisors } from "../../consultant/consultantSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { actGetActivities } from "../../Activity/activitySlice";
import actGetConsultants from "../../consultant/act/actGetConsultants";
import actGetSectors from "../../sector/act/actGetSectors";

const actGetProjectById = createAsyncThunk(
  "project/actGetProjectById",
  async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetActivities()).unwrap();
      await dispatch(actGetConsultants()).unwrap();
      await dispatch(actGetSectors()).unwrap();

      const { consultants } = getState().consultant;
      const { activities } = getState().activity;
      const { sectors } = getState().sector;

      const res = await api.get("api/Project/" + id);
      const activity = activities.find((sup) => sup.id === res.activityId);
      // const supervisorName = consultant ? consultant.name : "";
      const sector = sectors.find((sector) => sector.id === res.sectorId);

      return {
        ...res,
        activityName: activity.name,
        sectorName: sector.name,
      };
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjectById;
