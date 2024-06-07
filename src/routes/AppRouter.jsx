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
import Branch from "../pages/Branch";
import MangeBranches from "../pages/MangeBranches";
import ManageSupervisors from "../pages/ManageSupervisors";
import ProjectDetails from "../pages/ProjectDetails";
import Project from "../pages/Project";
import ProjectsBox from "../pages/ProjectsBox";
import ManageCompanies from "../pages/ManageCompanies";
import ManageItems from "../pages/ManageItems";
import RoleGuard from "../components/common/Auth/RoleGuard";

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
          path="project/add"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserBranch"]}>
              <Project />
            </RoleGuard>
          }
        />
        <Route
          path="project/edit/:id"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserBranch"]}>
              <Project />
            </RoleGuard>
          }
        />
        <Route path="project/id/:id" element={<ProjectDetails />} />
        <Route path="projectsbox" element={<ProjectsBox />} />
        <Route
          path="managebranches"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin", "DefaultUserBranch"]}>
              <MangeBranches />
            </RoleGuard>
          }
        />
        <Route path="branch/:id" element={<Branch />} />
        <Route
          path="managesupervisors"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin"]}>
              <ManageSupervisors />
            </RoleGuard>
          }
        />
        <Route
          path="manageitems"
          element={
            <RoleGuard roles={["Admin", "SuperAdmin"]}>
              <ManageItems />
            </RoleGuard>
          }
        />
        <Route path="managecompanies" element={<ManageCompanies />} />
      </Route>
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
