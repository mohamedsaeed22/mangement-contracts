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
        <Route index element={<Home />} />
        <Route path="project/add" element={<Project />} />
        <Route path="project/edit/:id" element={<Project />} />
        <Route path="project/id/:id" element={<ProjectDetails />} />
        <Route path="projectsbox" element={<ProjectsBox />} />
        <Route path="branch/:id" element={<Branch />} />
        <Route path="managebranches" element={<MangeBranches />} />
        <Route path="managesupervisors" element={<ManageSupervisors />} />
        <Route path="manageitems" element={<ManageItems />} />
        <Route path="managecompanies" element={<ManageCompanies />} />
      </Route>
    </>
  )
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
