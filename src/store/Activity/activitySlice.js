import { createSlice } from "@reduxjs/toolkit";
import actGetActivities from "./act/actGetActivities";
import actCreateActivity from "./act/actCreateActivity";
import actUpdateActivity from "./act/actUpdateActivity";
import actDeleteActivity from "./act/actDeleteActivity";

const initialState = {
  activities: [
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
  loading: false,
  error: null,
};

const ActivitySlice = createSlice({
  name: "Activity",
  initialState,
  reducers: {
    filteractivities: (state, { payload }) => {
      state.activities = state.activities.filter((b) => b.id !== `${payload}`);
    },
  },
  extraReducers: (builder) => {
    // get all activities
    builder.addCase(actGetActivities.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetActivities.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.activities = payload;
    });
    builder.addCase(actGetActivities.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // create Activitye
    builder.addCase(actCreateActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateActivity.fulfilled, (state, { payload }) => {
      state.loading = false;
      const { id, name, description } = payload;
      state.activities.unshift({ id, name, description, totalProjects: 0 });
    });
    builder.addCase(actCreateActivity.rejected, (state, action) => {
      state.loading = false;

      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = "حدث خطا ما فى الشبكة";
      }
    });

    // update Activity
    builder.addCase(actUpdateActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateActivity.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.activities.findIndex(
        (Activity) => Activity.id === payload.id
      );
      if (index !== -1) {
        state.activities[index] = payload;
      } else {
        console.error("Activity not found");
      }
    });
    builder.addCase(actUpdateActivity.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete Activitye
    builder.addCase(actDeleteActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteActivity.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteActivity.rejected, (state, action) => {
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
  actCreateActivity,
  actDeleteActivity,
  actGetActivities,
  actUpdateActivity,
};
export const { filteractivities } = ActivitySlice.actions;
export default ActivitySlice.reducer;
