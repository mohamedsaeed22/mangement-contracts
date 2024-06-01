import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageSuspenseFallback from "../components/feedback/PageSuspenseFallback/PageSuspenseFallback";

import Error from "../pages/Error";
import Home from "../pages/Home";

import AddProject from "../pages/AddProject";
import WithGuard from "../components/common/Auth/WithGuard";
import ProjectsTable from "../components/manageContracts/ProjectsTable";
import Branch from "../pages/Branch";
import MangeBranches from "../pages/MangeBranches";
import ManageSupervisors from "../pages/ManageSupervisors";
import ProjectDetails from "../pages/ProjectDetails";
const Login = lazy(() => import("../pages/Login"));
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
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
        element: <AddProject />,
      },
      {
        path: "project/edit/:id",
        element: <AddProject />,
      },
      {
        path: "project/id/:id",
        element: <ProjectDetails />,
      },
      {
        path: "projectsbox",
        element: <ProjectsTable />,
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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
