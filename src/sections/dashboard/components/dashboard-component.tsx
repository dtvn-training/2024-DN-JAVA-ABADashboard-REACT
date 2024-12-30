import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import DashboardFilters from "./dashboard-filters/DashboardFilters";
import MetricsCards from "./metrics-card/MetricsCards";
import ActivityChart from "./ActivityChart";
import ProjectsTable from "./ProjectsTable";
import DonutChart from '../../../components/donut-chart/DonutChart';
import LineChart from "../../../components/line-chart/LineChart";
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner';
import { fetchActiveUsers } from "../../../services/dashboard-services/active-users-services";
import EventDashboard from "./EventDashboard";

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [dimension, setDimension] = useState('');
  const [metric, setMetric] = useState('');
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [purchaseData, setPurchaseData] = useState<number[]>([]);
  const [purchaseLabels, setPurchaseLabels] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ startDate: Date, endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  // const handleFilterChange = (dimension: string, metric: string) => {
  //   setDimension(dimension);
  //   setMetric(metric);
  // };

  useEffect(() => {
    const getActiveUsers = async () => {
      setLoading(true);
      try {
        // Fake data for active users
        const fakeData = [
          { city: 'New York', activeUsers: 120 },
          { city: 'Los Angeles', activeUsers: 80 },
          { city: 'Chicago', activeUsers: 50 },
          { city: 'Houston', activeUsers: 30 },
          { city: 'Phoenix', activeUsers: 20 },
        ];
        const labels = fakeData.map(user => user.city);
        const values = fakeData.map(user => user.activeUsers);
        setChartLabels(labels);
        setChartData(values);
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setLoading(false);
      }
    };

    const getPurchaseData = async () => {
      setLoading(true);
      try {
        // Fake data for purchases
        const fakeData = [
          { date: '2023-01-01', count: 10 },
          { date: '2023-01-02', count: 15 },
          { date: '2023-01-03', count: 20 },
          { date: '2023-01-04', count: 25 },
          { date: '2023-01-05', count: 30 },
        ];
        const labels = fakeData.map(purchase => purchase.date);
        const values = fakeData.map(purchase => purchase.count);
        setPurchaseLabels(labels);
        setPurchaseData(values);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      } finally {
        setLoading(false);
      }
    };

    getActiveUsers();
    getPurchaseData();
  }, [dimension, metric, dateRange]);

 

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
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        width: "1800px",
      }}
    >
      <DashboardFilters />
      <Grid2 container >
        <Grid2 container size={{ md: 6 }}>
          <MetricsCards />
        </Grid2>
        <Grid2 container size={{ md: 6 }}>
          <ActivityChart data={activityData} />
        </Grid2>
        <Grid2 container size={{ md: 6 }}>
          <DonutChart data={chartData} labels={chartLabels} colors={["#FF6384", "#36A2EB", "#FFCE56"]} />
        </Grid2>
        <Grid2 container size={{ md: 6 }}>
          <LineChart data={purchaseData} labels={purchaseLabels} /> 

        </Grid2>

      </Grid2>
      <EventDashboard />
      

      <ProjectsTable rows={rows} />
    </Box>
  );
};

export default DashboardComponent;