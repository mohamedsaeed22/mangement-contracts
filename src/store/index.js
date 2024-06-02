import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import projectReducer from "./project/projectSlice";
import supervisorReducer from "./supervisor/supervisorSlice";
import companyReducer from "./company/companySlice";
import itemReducer from "./item/itemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
    project: projectReducer,
    supervisor: supervisorReducer,
    company: companyReducer,
    item: itemReducer,
  },
});

export default store;
