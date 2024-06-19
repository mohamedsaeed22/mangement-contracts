import { createSlice } from "@reduxjs/toolkit";
import actGetSectors from "./act/actGetSectors";
import actCreateSector from "./act/actCreateSector";
import actUpdateSector from "./act/actUpdateSector";
import actDeleteSector from "./act/actDeleteSector";

const initialState = {
  sectors: [
    {
      id: "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
      name: "mostafa",
      phone: "01018205801",
      createdAt: "2024-05-28T09:49:09.3182009",
      updatedAt: "2024-05-29T12:01:09.9385081",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
      name: "ali ",
      phone: "01018205801",
      createdAt: "2024-05-28T12:15:19.5268637",
      updatedAt: "2024-05-28T12:23:24.8224803",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
    {
      id: "7c491c54-4106-43c5-ba79-08dc7f08e15f",
      name: "osama",
      phone: "01018205801",
      createdAt: "2024-05-28T14:25:29.735027",
      updatedAt: "2024-05-29T12:01:46.5021573",
      updatedBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
      createdBy: "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
    },
  ],
  loading: false,
  error: null,
};

const sectorSlice = createSlice({
  name: "sector",
  initialState,
  reducers: {
    filterSectors: (state, { payload }) => {
      state.sectors = state.sectors.filter((i) => i.id !== `${payload}`);
    },
  },
  extraReducers: (builder) => {
    // get all sectors
    builder.addCase(actGetSectors.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetSectors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.sectors = payload;
    });
    builder.addCase(actGetSectors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create sector
    builder.addCase(actCreateSector.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateSector.fulfilled, (state, { payload }) => {
      state.loading = false;
      const { id, name, totalProjects } = payload;
      state.sectors.push({ id, name, totalProjects: 0 });
    });
    builder.addCase(actCreateSector.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload.response === 400) {
        state.error = "لا بد ان يكون الصنف والوصف اكثر من 3 احرف";
      } else if (payload.response === 500) {
        state.error = "حدث خطا ما فى السرفر";
      }
    });

    // update sector
    builder.addCase(actUpdateSector.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateSector.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.sectors.findIndex(
        (sectors) => sectors.id === payload.id
      );
      if (index !== -1) {
        state.sectors[index] = payload;
      } else {
        console.error("sector not found");
      }
    });
    builder.addCase(actUpdateSector.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete sector
    builder.addCase(actDeleteSector.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteSector.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteSector.rejected, (state, action) => {
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

export { actGetSectors, actDeleteSector, actUpdateSector, actCreateSector };
export const { filterSectors } = sectorSlice.actions;
export default sectorSlice.reducer;
