import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageSuspenseFallback from "../components/feedback/PageSuspenseFallback/PageSuspenseFallback";

import Error from "../pages/Error";
import Companies from "../pages/Companies";
import Contracts from "../pages/Contracts";
import Home from "../pages/Home";
import ContractsBox from "../pages/ContractsBox";
const Login = lazy(() => import("../pages/Login"));
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>please wait loading...</div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
             <Home />
          </PageSuspenseFallback>
        ),
      },

      {
        path: "login",
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "companies",
        element: (
          <PageSuspenseFallback>
            <Companies />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "contracts",
        element: (
          <PageSuspenseFallback>
            {/* <Contracts /> */}
            <ContractsBox/>
          </PageSuspenseFallback>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
