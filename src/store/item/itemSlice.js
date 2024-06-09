import { createSlice } from "@reduxjs/toolkit";
import actGetItems from "./act/actGetItems";
import actCreateItem from "./act/actCreateItem";
import actUpdateItem from "./act/actUpdateItem";
import actDeleteItem from "./act/actDeleteItem";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    filterItems: (state, { payload }) => {
      state.items = state.items.filter((i) => i.id !== `${payload}`);
    },
  },
  extraReducers: (builder) => {
    // get all items
    builder.addCase(actGetItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetItems.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    });
    builder.addCase(actGetItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create item
    builder.addCase(actCreateItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actCreateItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      const { id, name, description } = payload;
      state.items.push({ id, name, description });
    });
    builder.addCase(actCreateItem.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload.response === 400) {
        state.error = "لا بد ان يكون الصنف والوصف اكثر من 3 احرف";
      } else if (payload.response === 500) {
        state.error = "حدث خطا ما فى السرفر";
      }
    });

    // update item
    builder.addCase(actUpdateItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actUpdateItem.fulfilled, (state, { payload }) => {
      state.loading = false;
      const index = state.items.findIndex((items) => items.id === payload.id);
      if (index !== -1) {
        state.items[index] = payload;
      } else {
        console.error("Activity not found");
      }
    });
    builder.addCase(actUpdateItem.rejected, (state, action) => {
      state.loading = false;
      if (action?.payload === 403) {
        state.error = "ليس لديك الصلاحية لرؤية هذة الصفحة";
      } else if (action?.payload === 500) {
        state.error = "حدث خطا ما فى السيرفر";
      } else {
        state.error = action.payload;
      }
    });

    // delete item
    builder.addCase(actDeleteItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actDeleteItem.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(actDeleteItem.rejected, (state, action) => {
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

export { actGetItems, actDeleteItem, actUpdateItem, actCreateItem };
export const { filterItems } = itemSlice.actions;
export default itemSlice.reducer;
