// import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import DashboardFilters from "./dashboard-filters/DashboardFilters";
import MetricsCards from "./metrics-card/MetricsCards"
import ActivityChart from "./ActivityChart"
import TopicsCharts from "./TopicsCharts"; 
import ProjectsTable from "./ProjectsTable";


const DashboardComponent = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Activity",
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        backgroundColor: ["rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const weakestTopicsData = {
    labels: ["Total Project", "Total Engagement", "Customer Growth"],
    datasets: [
      {
        data: [81, 62, 22],
        backgroundColor: ["#ff6384", "#ff9f40", "#ffcd56"],
      },
    ],
  };

  const strongestTopicsData = {
    labels: ["Russia", "Seychelles", "Vietnam"],
    datasets: [
      {
        data: [54, 27, 19],
        backgroundColor: ["#36a2eb", "#4bc0c0", "#9966ff"],
      },
    ],
  };

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

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        width: "1800px",
      }}
    >
      <DashboardFilters />
      <Grid container >
          <Grid container md={6}>
            <MetricsCards />
          </Grid>
          <Grid container  md={6}>
            <ActivityChart data={activityData} />
          </Grid>
          
      </Grid>
      
      
      <TopicsCharts
        weakestTopicsData={weakestTopicsData}
        strongestTopicsData={strongestTopicsData}
      />
      <ProjectsTable rows={rows} />
    </Box>
  );
};

export default DashboardComponent;