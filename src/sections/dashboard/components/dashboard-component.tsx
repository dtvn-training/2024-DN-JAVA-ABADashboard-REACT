import {
  Box,
  CardContent,
  Paper,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaPiedPiper
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Grid from "@mui/material/Grid2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { styled as style } from "@mui/material/styles";

import styled from "./dashboard-component.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
// import { AnalyticsDashboard } from 'react-analytics-charts';
// Over ten different commonly used charts are available
// import { SessionsByDateChart, SessionsGeoChart } from 'react-analytics-charts';

const cx = classnames.bind(styled);

const Item = style(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const StyledCard = style(Card)(({}) => ({
  height: "100%",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const IconWrapper = style(Box)(({}) => ({
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "#1976d2",
}));

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [3000, 4500, 3200, 5600, 4800, 6000],
      borderColor: "#1976d2",
      tension: 0.4,
    },
  ],
};

const categoryData = {
  labels: ["Electronics", "Clothing", "Books", "Food", "Others"],
  datasets: [
    {
      label: "Sales by Category",
      data: [12000, 8000, 5000, 7000, 4000],
      backgroundColor: ["#1976d2", "#2196f3", "#64b5f6", "#90caf9", "#bbdefb"],
    },
  ],
};

const recentSales = [
  { id: "TR001", customer: "John Doe", amount: 1200, date: "2024-01-15" },
  { id: "TR002", customer: "Jane Smith", amount: 850, date: "2024-01-14" },
  { id: "TR003", customer: "Bob Wilson", amount: 2300, date: "2024-01-13" },
  { id: "TR004", customer: "Alice Brown", amount: 760, date: "2024-01-12" },
  { id: "TR005", customer: "Charlie Davis", amount: 1500, date: "2024-01-11" },
];

const DashboardComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={cx("container")}>
      <Grid container>
        <Grid container spacing={2} size={6}>
          <Grid size={4}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper></IconWrapper>
                  <Typography variant="h6" component="div">
                    Active Users
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    100
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>

          <Grid size={4}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper>{/* <FaShoppingCart /> */}</IconWrapper>
                  <Typography variant="h6" component="div">
                    Event Count
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    1,234
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>

          <Grid size={4}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper>{/* <FaChartLine /> */}</IconWrapper>
                  <Typography variant="h6" component="div">
                    View Pages
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    250
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>
          <Grid size={4} sx={{mb:1}}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper></IconWrapper>
                  <Typography variant="h6" component="div">
                    Scroll Pages
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    100
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>

          <Grid size={4}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper></IconWrapper>
                  <Typography variant="h6" component="div">
                    Purchase
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    1,234
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>

          <Grid size={4}>
            <Item>
              <StyledCard>
                <CardContent>
                  <IconWrapper>{/* <FaChartLine /> */}</IconWrapper>
                  <Typography variant="h6" component="div">
                    Clicks
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    250
                  </Typography>
                </CardContent>
              </StyledCard>
            </Item>
          </Grid>
        </Grid>

        <Grid size={6}>
          <Grid>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <Line data={salesData} options={{ responsive: true }} />
            </Paper>
          </Grid>
        </Grid>

      </Grid>

      <Grid size={12}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <Line data={salesData} options={{ responsive: true }} />
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <Bar data={categoryData} options={{ responsive: true }} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Recent Sales
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSales
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell align="right">${row.amount}</TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={recentSales.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </div>
  );
};

export default DashboardComponent;
