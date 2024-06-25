import { createSlice } from "@reduxjs/toolkit";
import actCreateAssignBudget from "./act/actCreateAssignBudget";
import actDeleteAssignBudget from "./act/actDeleteAssignBudget";

const initialState = {
  assignBudgets: [],
  loading: false,
  error: null,
};

const assignBudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create spentBudget
    builder.addCase(actCreateAssignBudget.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateAssignBudget.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    });
    builder.addCase(actCreateAssignBudget.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete spentBudget
    builder.addCase(actDeleteAssignBudget.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteAssignBudget.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteAssignBudget.rejected, (state, action) => {
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

export { actCreateAssignBudget, actDeleteAssignBudget };

export default assignBudgetSlice.reducer;
