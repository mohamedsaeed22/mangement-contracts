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
        path: "addProject",
        element: <AddProject />,
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
        path: "mangebranches",
        element: <MangeBranches />,
      },
      {
        path: "mangesupervisors",
        element: <ManageSupervisors />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
