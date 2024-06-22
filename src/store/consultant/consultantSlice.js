import { createSlice } from "@reduxjs/toolkit";
import actCreateConsultant from "./act/actCreateConsultant";
import actGetConsultantByProjectId from "./act/actGetConsultants";
import actDeleteConsultant from "./act/actDeleteConsultant";
import actGetConsultants from "./act/actGetConsultants";
import actUpdateConsultant from "./act/actUpdateConsultant";
import actGetConsultantById from "./act/actGetConsultantById";

const initialState = {
  consultants: [
    {
      id: "cd3215dd-4dc8-441c-005f-08dc7ee21558",
      name: "مالية",
      description: "ماليه 2023",
      createdAt: "2024-05-28T09:47:46.3592734",
      updatedAt: "2024-05-29T12:00:32.3698791",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
      name: "هندسية",
      description: "هندسية 2023",
      createdAt: "2024-05-28T14:16:58.8999641",
      updatedAt: "2024-05-29T12:00:55.4923748",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
  ],
  consultant: {},
  loading: false,
  error: null,
};

const consultantSlice = createSlice({
  name: "contractor",
  initialState,
  reducers: {
    filterConsultants: (state, { payload }) => {
      state.consultants = state.consultants.filter(
        (el) => el.id !== `${payload}`
      );
    },
  },
  extraReducers: (builder) => {
    // get all consultants
    builder.addCase(actGetConsultants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetConsultants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.consultants = payload;
    });
    builder.addCase(actGetConsultants.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(actGetConsultantById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetConsultantById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.consultant = payload;
    });
    builder.addCase(actGetConsultantById.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
    // create consultant
    builder.addCase(actCreateConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.consultants.push({ ...payload, totalProjects: 0 });
    });
    builder.addCase(actCreateConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    builder.addCase(actUpdateConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;
      // const index = state.consultants.findIndex(
      //   (consultant) => consultant.id === payload.id
      // );
      // if (index !== -1) {
      //   state.consultants[index] = payload;
      // } else {
      //   console.error("Activity not found");
      // }
    });
    builder.addCase(actUpdateConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete consultant
    builder.addCase(actDeleteConsultant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteConsultant.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });
  },
});

export {
  actCreateConsultant,
  actGetConsultantByProjectId,
  actDeleteConsultant,
  actGetConsultantById,
};

export const { filterConsultants } = consultantSlice.actions;
export default consultantSlice.reducer;
