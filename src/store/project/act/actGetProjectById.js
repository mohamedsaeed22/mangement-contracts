import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { actGetSupervisors } from "../../supervisor/supervisorSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { actGetActivities } from "../../Activity/activitySlice";

const actGetProjectById = createAsyncThunk(
  "project/actGetProjectById",
  async (id, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetSupervisors()).unwrap();
      await dispatch(actGetActivities()).unwrap();
      const { supervisors } = getState().supervisor;
      const { activities } = getState().Activity;
      const res = await api.get("api/Project/" + id);
      const supervisor = supervisors.find(
        (sup) => sup.id === res.data.supervisorId
      );
      const supervisorName = supervisor ? supervisor.name : "";
      const Activity = activities.find(
        (Activity) => Activity.id === res.data.ActivityId
      );
      const ActivityName = Activity ? Activity.name : "";
      res.data.supervisorName = supervisorName;
      res.data.ActivityName = ActivityName;
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjectById;
