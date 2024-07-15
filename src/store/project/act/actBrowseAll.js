import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { convertDateToIso } from "../../../utils/convertDateToIso";
import { actGetActivities } from "../../Activity/activitySlice";
import actGetConsultants from "../../consultant/act/actGetConsultants";
import actGetSectors from "../../sector/act/actGetSectors";

const actBrowseAll = createAsyncThunk(
  "project/actBrowseAll",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await api.get(
        `api/Project/browseAll?Search=${params.search}&Status=${
          params.status
        }&StartDate=${convertDateToIso(
          params.startDate
        )}&EndDate=${convertDateToIso(params.endDate)}&ActivityId=${
          params.activityId
        }&SupervisorId=${params.supervisorId}&SectorId=${
          params.sectorId
        }&ContractorId=${params.contractorId}&ConsultantId=${
          params.consultantId
        }&SpentBudget=${params.spentBudget}`
      );

      return res;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actBrowseAll;
