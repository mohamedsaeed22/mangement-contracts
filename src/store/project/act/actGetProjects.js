import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/axios-global";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actGetProjects = createAsyncThunk(
  "project/actGetProjects",
  async (params, thunk) => {
    const { rejectWithValue } = thunk;
    console.log(params.search);
    console.log(params.page);

    try {
      const res = await api.get(
        `api/Project/browse?Search=${params.search}&PageSize=10&Page=${params.page}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProjects;
