import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import classNames from "classnames/bind";
import styled from "./dashboard-component.module.scss";
import DashboardFilters from "./dashboard-filters/DashboardFilters";
import MetricsCards from "./metrics-card/MetricsCards";
import ActivityChart from "./activity-chart/ActivityChart";
import ProjectsTable from "./table-dashboard/ProjectsTable";
import SubmitFormChart from "./submit-form-chart/SubmitFormChart";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import PurchasesChart from "./purchases-chart/PurchasesChart";
import EventDashboard from "./event-dashboard/EventDashboard";
import TableFillter from "./table-fillters/TableFillter";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchEventsThunk } from "../../../redux/dashboard-slice/eventsSlice";
import { format } from 'date-fns';

const cx = classNames.bind(styled); 

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const eventsData = useAppSelector(state => state.events);
  const eventname  = useAppSelector(state => state.filters.eventname);
  const { startDate, endDate } = useAppSelector(state => state.filters.dateRange);
  const {currentPage, pageSize} = useAppSelector(state => state.events);

  const startDateTime = format(new Date(startDate), 'yyyy-MM-dd');
  const endDateTime = format(new Date(endDate), 'yyyy-MM-dd');

  const fetchEvents = useCallback(async () => {
    try {
      await dispatch(
        fetchEventsThunk({
          pageNum: currentPage,
          pageSize: pageSize,
          startDate: startDateTime,
          endDate: endDateTime,
          eventLabel: eventname,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, startDate, endDate, eventname, currentPage]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
          <MetricsCards/>
        </Grid2>
        <Grid2 size={{ md: 6 }}>
          <ActivityChart />
        </Grid2>
        <Grid2 size={{ md: 6 }}>
          <PurchasesChart /> 
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 6 }}>
          <EventDashboard />
        </Grid2>
        <Grid2 size={{ md: 6 }}>
          <SubmitFormChart />
        </Grid2>      
      </Grid2>
      <TableFillter />
      <ProjectsTable rows={rows} />
    </Box>
  );
};

export default DashboardComponent;