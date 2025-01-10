import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ABADashboardLayout } from "../layouts/dashboard-layout";
import {AuthenticationLayout} from "../layouts/authenticate-layout";
export const DashboardPage = lazy(() => import("../pages/dashboard"));
export const LoginPage = lazy(() => import("../pages/login"));
export const RegisterPage = lazy(() => import("../pages/register"));


export default function Router() {
  const routers = useRoutes([
    {
      path:"/",
      element: (
        <ABADashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ABADashboardLayout>
      ),
      children: [
        {
            path: "",
            element: <Navigate to="/dashboard" />,
            index: true,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "/*",
          element: <Navigate to="/dashboard" />,
        }
      ]
    },
    {
      path: "/auth",
      element: (
        <AuthenticationLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </AuthenticationLayout>
      ),
      children: [
        {
          path: "sign-in",
          element: <LoginPage />,
          index: true,
        },
        {
          path: "register",
          element: <RegisterPage />,
          index: true,
        }
      ]
    },
  ]);
  return routers;
}