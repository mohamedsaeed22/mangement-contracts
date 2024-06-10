import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { actGetSupervisors } from "../../consultant/consultantSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { convertDateToIso } from "../../../utils/convertDateToIso";
import { actGetActivities } from "../../Activity/activitySlice";

const actGetProjects = createAsyncThunk(
  "project/actGetProjects",
  async (params, thunkAPI) => {
    console.log(params);
    const {
      page,
      search,
      startDate,
      status,
      endDate,
      activityId,
      spentBudget,
      supervisorId,
    } = params;
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      // await dispatch(actGetSupervisors()).unwrap();
      // await dispatch(actGetActivities()).unwrap();
      // const { consultants } = getState().consultant;
      // const { activities } = getState().activity;
      // console.log(supervisors);
      const res = await api.get(
        `api/Project/browse?Search=${search}&PageSize=10&Page=${page}&Status=${status}&StartDate=${convertDateToIso(
          startDate
        )}&EndDate=${convertDateToIso(
          endDate
        )}&ActivityId=${activityId}&SupervisorId=${supervisorId}&SpentBudget=${spentBudget}`
      );
      console.log(res);
      // const enhancedProjects = res.data.data.map((project) => {
      //   const supervisor = consultants.find(
      //     (sup) => sup.id === project.consultantId
      //   );
      //   const Activity = activities.find((br) => br.id === project.ActivityId);
      //   return {
      //     ...project,
      //     supervisorName: supervisor.name,
      //     ActivityName: Activity.name,
      //   };
      // });
      // enhancedProjects.sort(
      //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      // );
      // return {
      //   ...res.data,
      //   data: enhancedProjects,
      // };
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjects;
