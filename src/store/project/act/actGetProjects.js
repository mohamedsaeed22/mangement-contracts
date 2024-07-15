import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { convertDateToIso } from "../../../utils/convertDateToIso";
import { actGetActivities } from "../../Activity/activitySlice";
import actGetConsultants from "../../consultant/act/actGetConsultants";
import actGetSectors from "../../sector/act/actGetSectors";

const actGetProjects = createAsyncThunk(
  "project/actGetProjects",
  async (params, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    try {
      await dispatch(actGetActivities()).unwrap();
      await dispatch(actGetConsultants()).unwrap();
      await dispatch(actGetSectors()).unwrap();
      const { sectors } = getState().sector;
      const { activities } = getState().activity;

      const res = await api.get(
        `api/Project/browse?Search=${params.search}&PageSize=10&Page=${
          params.page
        }&Status=${params.status}&StartDate=${convertDateToIso(
          params.startDate
        )}&EndDate=${convertDateToIso(params.endDate)}&ActivityId=${
          params.activityId
        }&SupervisorId=${params.supervisorId}&SectorId=${
          params.sectorId
        }&ContractorId=${params.contractorId}&ConsultantId=${params.consultantId}&SpentBudget=${params.spentBudget}`
      );
      const enhancedProjects = res.data.map((project) => {
        const sector = sectors.find((sec) => sec.id === project.sectorId);
        const activity = activities.find((ac) => ac.id === project.activityId);

        return {
          ...project,
          sectorName: sector.name,
          activityName: activity.name,
        };
      });
      enhancedProjects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return {
        ...res,
        data: enhancedProjects,
      };
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProjects;
