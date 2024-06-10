import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import ActivityReducer from "./Activity/activitySlice";
import projectReducer from "./project/projectSlice";
import consultantReducer from "./consultant/consultantSlice";
import companyReducer from "./company/companySlice";
import statReducer from "./Statistics/statSlice";
import riskReducer from "./risk/riskSlice";
import handicapReducer from "./handicap/handicapSlice";
import sectorReducer from "./sector/sectorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: ActivityReducer,
    project: projectReducer,
    consultant: consultantReducer,
    company: companyReducer,
    stat: statReducer,
    risk: riskReducer,
    handicap: handicapReducer,
    sector: sectorReducer,
  },
});

export default store;
