import { createSlice } from "@reduxjs/toolkit";
import actGetSectors from "./act/actGetSectors";
import actCreateSector from "./act/actCreateSector";
import actUpdateSector from "./act/actUpdateSector";
import actDeleteSector from "./act/actDeleteSector";

const initialState = {
  sectors: [],
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
      // const index = state.sectors.findIndex(
      //   (sectors) => sectors.id === payload.id
      // );
      // if (index !== -1) {
      //   state.sectors[index] = payload;
      // } else {
      //   console.error("sector not found");
      // }
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
