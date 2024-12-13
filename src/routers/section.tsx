import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ABADashboardLayout } from "../layouts";
export const DashboardPage = lazy(() => import("../pages/dashboard"));
export const GtmConfigurationPage = lazy(() => import("../pages/gtm-configuration"));


export default function Router() {
  const routers = useRoutes([
    {
      element: (
        <ABADashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ABADashboardLayout>
      ),
      children: [
        {
            path: "/",
            element: <Navigate to="/dashboard" />,
            index: true,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
          index: true,
        },
        {
          path: "/gtm-configuration",
          element: <GtmConfigurationPage />
        }
      ]
    },
  ]);
  return routers;
}
