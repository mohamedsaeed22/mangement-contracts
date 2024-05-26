import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import projectReducer from "./project/projectSlice";
import supervisorReducer from "./supervisor/supervisorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
    project: projectReducer,
    supervisor: supervisorReducer,
  },
});

export default store;
