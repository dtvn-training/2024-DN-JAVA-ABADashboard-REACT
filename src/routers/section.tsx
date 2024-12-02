import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { ABADashboardLayout } from "../layouts";
export const DashboardPage = lazy(() => import("../pages/dashboard"));


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
            element: <DashboardPage />,
            index: true,
        }
      ]
    },
  ]);
  return routers;
}
