import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PageSuspenseFallback from "../components/feedback/PageSuspenseFallback/PageSuspenseFallback";

import Error from "../pages/Error";
import Home from "../pages/Home";
import WithGuard from "../components/common/Auth/WithGuard";
import Activity from "../pages/Activity";
import ProjectDetails from "../pages/ProjectDetails";
import Project from "../pages/Project";
import ProjectsBox from "../pages/ProjectsBox";
import RoleGuard from "../components/common/Auth/RoleGuard";
import ManageContractors from "../pages/ManageContractors";
import Sector from "../pages/Sector";
import ManageActivities from "../pages/ManageActivities";
import ManageConsultants from "../pages/ManageConsultants";
import ManageSectors from "../pages/ManageSectors";
const Login = lazy(() => import("../pages/Login"));
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="login"
        element={
          <Suspense fallback={<PageSuspenseFallback />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<PageSuspenseFallback />}>
            <WithGuard>
              <MainLayout />
            </WithGuard>
          </Suspense>
        }
        errorElement={<Error />}
      >
        <Route
          index
          element={
            <RoleGuard
              roles={["Admin", "SuperAdmin", "ProjectManagement.ReadOnly"]}
            >
              <Home />
            </RoleGuard>
          }
        />
        <Route
          path="managesectors"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin"]}>
              <ManageSectors />
            </RoleGuard>
          }
        />
        <Route
          path="project/add"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserActivity"]}>
              <Project />
            </RoleGuard>
          }
        />
        <Route
          path="project/edit/:id"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserActivity"]}>
              <Project />
            </RoleGuard>
          }
        />
        <Route path="project/id/:id" element={<ProjectDetails />} />
        <Route path="projectsbox" element={<ProjectsBox />} />
        <Route
          path="manageactivities"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserActivity"]}>
              <ManageActivities />
            </RoleGuard>
          }
        />
        <Route
          path="manageconsultants"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserActivity"]}>
              <ManageConsultants />
            </RoleGuard>
          }
        />
        <Route path="activity/:id" element={<Activity />} />
        <Route path="sector/:id" element={<Sector />} />

        <Route
          path="managecotractor"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin"]}>
              <ManageContractors />
            </RoleGuard>
          }
        />
      </Route>
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
