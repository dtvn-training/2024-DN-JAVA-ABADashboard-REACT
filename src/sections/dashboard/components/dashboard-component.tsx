import { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import classNames from "classnames/bind";
import styled from "./dashboard-component.module.scss";
import DashboardFilters from "./dashboard-filters/DashboardFilters";
import MetricsCards from "./metrics-card/MetricsCards";
import ActivityChart from "./activity-chart/ActivityChart";
import SubmitFormChart from "./submit-form-chart/SubmitFormChart";
import LoadingSpinner from "../../../components/loading-spinner/loading-spinner";
import PurchasesChart from "./purchases-chart/PurchasesChart";
import EventDashboard from "./event-dashboard/EventDashboard";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchEventsThunk } from "../../../redux/dashboard-slice/eventsSlice";
import { format } from "date-fns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchMediaThunk, fetchCampaignsThunk } from "../../../redux/dashboard-slice/filtersSlice";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1000,
      xl: 1200,
    },
  },
});

const cx = classNames.bind(styled);

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const eventname = useAppSelector((state) => state.filters.eventname);
  const { startDate, endDate } = useAppSelector(
    (state) => state.filters.dateRange
  );
  const {campaign, media} = useAppSelector((state) => state.filters )
  const { currentPage, pageSize } = useAppSelector((state) => state.events);

  const startDateTime = format(new Date(startDate), "yyyy-MM-dd");
  const endDateTime = format(new Date(endDate), "yyyy-MM-dd");

  const fetchMedia = useCallback(async () => {
      await dispatch(fetchMediaThunk()).unwrap();

  },[dispatch]);

  const fetchCampaigns = useCallback(async () => {
    await dispatch(fetchCampaignsThunk()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    fetchMedia();
    fetchCampaigns();
  }, [fetchMedia, fetchCampaigns]);

  useEffect( () => {
    try {  
        dispatch(
        fetchEventsThunk({
          pageNum: currentPage,
          pageSize: pageSize,
          startDate: startDateTime,
          endDate: endDateTime,
          eventLabel: eventname,
          campaignName: campaign,
          mediumName: media
        })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching events data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, startDate, endDate, eventname, currentPage, campaign, media]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Box className={cx("container")}>
        <DashboardFilters />
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12}}>
            <MetricsCards />
          </Grid2>
          <Grid2 size={{xs: 12, lg: 6}}>
            <ActivityChart />
          </Grid2>
          <Grid2 size={{xs: 12, lg: 6}}>
            <PurchasesChart />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, lg: 6}}>
            <EventDashboard />
          </Grid2>
          <Grid2 size={{xs: 12, lg: 6}}>
            <SubmitFormChart />
          </Grid2>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardComponent;
