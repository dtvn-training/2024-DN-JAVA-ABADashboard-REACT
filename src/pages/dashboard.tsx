import { Helmet } from "react-helmet-async";
import { DashboardView } from "../sections/dashboard/view";

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard page</title>
      </Helmet>
      <DashboardView />
    </>
  );
};

export default DashboardPage;
