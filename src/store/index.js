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
import contractorReducer from "./contractor/contractorSlice";
import projectConsultantReducer from "./projectConsultant/projectConsultantSlice";
import projectContractorReducer from "./projectContractor/projectConctractorSlice";
import spendBudgetedReducer from "./spentBudget/spentBudgetSlice";
import assignBudgetedReducer from "./budget/assignBudgetSlice";
import userReducer from "./users/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: ActivityReducer,
    project: projectReducer,
    consultant: consultantReducer,
    contractor: contractorReducer,
    projectConsultant: projectConsultantReducer,
    projectContractor: projectContractorReducer,
    company: companyReducer,
    stat: statReducer,
    risk: riskReducer,
    handicap: handicapReducer,
    sector: sectorReducer,
    spentBudget: spendBudgetedReducer,
    assignBudget: assignBudgetedReducer,
    user: userReducer,
  },
});

export default store;
