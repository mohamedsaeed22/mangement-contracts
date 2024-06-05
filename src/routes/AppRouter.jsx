import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
// const { roles } = useSelector((state) => state.auth);

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<PageSuspenseFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<PageSuspenseFallback />}>
        <WithGuard>
          <MainLayout />
        </WithGuard>
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "project/add",
        element: <Project />,
      },
      {
        path: "project/edit/:id",
        element: <Project />,
      },
      {
        path: "project/id/:id",
        element: <ProjectDetails />,
      },
      {
        path: "projectsbox",
        element: <ProjectsBox />,
      },
      {
        path: "branch/:id",
        element: <Branch />,
      },
      {
        path: "managebranches",
        element: <MangeBranches />,
      },
      {
        path: "managesupervisors",
        element: <ManageSupervisors />,
      },
      {
        path: "manageitems",
        element: <ManageItems />,
      },
      {
        path: "managecompanies",
        element: <ManageCompanies />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
