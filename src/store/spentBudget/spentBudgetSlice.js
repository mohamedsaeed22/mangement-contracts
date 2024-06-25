import { createSlice } from "@reduxjs/toolkit";
import actCreateSpentBudget from "./act/actCreateSpentBudget";
import actDeleteSpentBudget from "./act/actDeleteSpentBudget";

const initialState = {
  spentBudgets: [],
  loading: false,
  error: null,
};

const spentBudgetSlice = createSlice({
  name: "spentBudget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create spentBudget
    builder.addCase(actCreateSpentBudget.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateSpentBudget.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    });
    builder.addCase(actCreateSpentBudget.rejected, (state, action) => {
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
    builder.addCase(actDeleteSpentBudget.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteSpentBudget.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteSpentBudget.rejected, (state, action) => {
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

export { actCreateSpentBudget, actDeleteSpentBudget };

export default spentBudgetSlice.reducer;
