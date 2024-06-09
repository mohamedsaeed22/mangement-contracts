import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import ActivityReducer from "./Activity/activitySlice";
import projectReducer from "./project/projectSlice";
import supervisorReducer from "./supervisor/supervisorSlice";
import companyReducer from "./company/companySlice";
import itemReducer from "./item/itemSlice";
import statReducer from "./Statistics/statSlice";
import riskReducer from "./risk/riskSlice";
import handicapReducer from "./handicap/handicapSlice";
import sectorReducer from "./sector/sectorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: ActivityReducer,
    project: projectReducer,
    supervisor: supervisorReducer,
    company: companyReducer,
    item: itemReducer,
    stat: statReducer,
    risk: riskReducer,
    handicap: handicapReducer,
    sector: sectorReducer,
  },
});

export default store;
