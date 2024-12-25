import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import styled from "./dashboard-component.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styled);

const DashboardComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const activityData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Activity",
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Select defaultValue="Medium">
          <MenuItem value="Medium">Medium</MenuItem>
        </Select>
        <Select defaultValue="Event">
          <MenuItem value="Event">Event</MenuItem>
        </Select>
        <Select defaultValue="Weekly">
          <MenuItem value="Weekly">Time: Weekly</MenuItem>
        </Select>
        <Select defaultValue="Campaign">
          <MenuItem value="Campaign">Campaign</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        <Grid container spacing={2} md={6}>
          <Grid   item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">27/80</Typography>
              <Typography variant="body2">Active Users</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">3,298</Typography>
              <Typography variant="body2">Event Count</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">700</Typography>
              <Typography variant="body2">View Pages</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">27/80</Typography>
              <Typography variant="body2">Active Users</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">3,298</Typography>
              <Typography variant="body2">Event Count</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h4">700</Typography>
              <Typography variant="body2">View Pages</Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          md={6}
          sx={{  justifyContent: "center" , backgroundColor: "white",margin: "8px"}}
        >
          <Box sx={{ mt: 2 }}>
            <Card sx={{ p: 3 }}>
              <Bar
                data={activityData}
                options={{
                  maintainAspectRatio: false,
                }}
                height={200}
                width={600}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} cx={{ alignItems: "center"}} >
        <Grid container spacing={2} sx={{ mt: 4, backgroundColor: "white" }} md={6}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Weakest Topics
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4}>
                  <Doughnut
                    data={{
                      labels: ["Total Project"],
                      datasets: [
                        {
                          data: [81, 19],
                          backgroundColor: ["#FF7043", "#F5F5F5"],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: { enabled: false },
                      },
                      cutout: "70%",
                    }}
                  />
                  <Typography align="center" variant="body1" sx={{ mt: 1 }}>
                    Total Project
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Doughnut
                    data={{
                      labels: ["Total Engagement"],
                      datasets: [
                        {
                          data: [62, 38],
                          backgroundColor: ["#FFA726", "#F5F5F5"],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: { enabled: false },
                      },
                      cutout: "70%",
                    }}
                  />
                  <Typography align="center" variant="body1" sx={{ mt: 1 }}>
                    Total Engagement
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Doughnut
                    data={{
                      labels: ["Customer Growth"],
                      datasets: [
                        {
                          data: [22, 78],
                          backgroundColor: ["#FFCC80", "#F5F5F5"],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: { enabled: false },
                      },
                      cutout: "70%",
                    }}
                  />
                  <Typography align="center" variant="body1" sx={{ mt: 1 }}>
                    Customer Growth
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius:"10px" }} md={6} >
          <Grid item xs={8} md={6}>
            <Card sx={{ p: 3, width : "300px", marginLeft:"20px" }} >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Strongest Topics
              </Typography>
              <Doughnut data={strongestTopicsData}
            
                  
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Budget</TableCell>
                <TableCell>Budget Left</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.totalBudget}</TableCell>
                  <TableCell>{row.budgetLeft}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
