import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import classNames from "classnames/bind";
import styled from "./dashboard-component.module.scss";
import DashboardFilters from "./dashboard-filters/DashboardFilters";
import MetricsCards from "./metrics-card/MetricsCards";
import ActivityChart from "./activity-chart/ActivityChart";
import ProjectsTable from "./ProjectsTable";
import SubmitFormChart from "./submit-form-chart/SubmitFormChart";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import PurchasesChart from "./purchases-chart/PurchasesChart";
import EventDashboard from "./event-dashboard/EventDashboard";

const cx = classNames.bind(styled);

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const rows = [
    {
      name: "Project A",
      status: "Active",
      totalBudget: "$10,000",
      budgetLeft: "$5,000",
      location: "New York",
      startDate: "01/01/2023",
      endDate: "12/31/2023",
    },
    {
      name: "Project B",
      status: "Completed",
      totalBudget: "$20,000",
      budgetLeft: "$0",
      location: "London",
      startDate: "01/01/2022",
      endDate: "12/31/2022",
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx("container")}>
      <DashboardFilters />
      <Grid2 container spacing={2}> 
        <Grid2 size={{ md: 12 }}>
          <MetricsCards />
        </Grid2>
        <Grid2  size={{ md: 6 }}>
          <ActivityChart />
        </Grid2>
        <Grid2 size={{ md: 6 }}>
          <PurchasesChart /> 
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <EventDashboard />
        <Grid2 size={{ md: 6 }}>
          <SubmitFormChart />
        </Grid2>      
      </Grid2>
      <ProjectsTable rows={rows} />
    </Box>
  );
};

export default DashboardComponent;
