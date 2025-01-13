import React, { useEffect } from "react";
import { Box, Select, SelectChangeEvent } from "@mui/material";
import styles from "./dashboard-filters.module.scss";
import classNames from "classnames/bind";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  setDateRange,
  setEventName,
  setMedia,
  setCampaign,
} from "../../../../redux/dashboard-slice/filtersSlice";
import DateRangePickerComponent from "../../../../components/date-time-picker/DateRangePickerComponent";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";

const cx = classNames.bind(styles);

const DashboardFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector((state) => state.filters.dateRange);
  const [media, setMediaState] = React.useState<string>("");
  const [eventName, setEventNameState] = React.useState<string>("");
  const [campaign, setCampaignState] = React.useState<string>("");
  const { medias } = useAppSelector((state) => state.filters);
  const { campaigns } = useAppSelector((state) => state.filters);

  const eventNames = [
    "eventName",
    "city",
    "source",
    "pageTitle",
    "pagePath",
    "medium",
    "date",
  ];

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
  
    const timer = setTimeout(() => {
      dispatch(
        setDateRange({
          startDate: sevenDaysAgo.toISOString(),
          endDate: today.toISOString(),
        })
      );
    }, 1000); 
  
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMediaState(value);
    if (value === "All") dispatch(setMedia(null));
    else dispatch(setMedia(value));
  };

  const handleEventNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEventNameState(value);
    dispatch(setEventName(value));
  };

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCampaignState(value);
    dispatch(setCampaign(value));
  };

  const handleDateRangeChange = (range: { startDate: Date; endDate: Date }) => {
    dispatch(
      setDateRange({
        startDate: range.startDate.toISOString(),
        endDate: range.endDate.toISOString(),
      })
    );
  };

  if (!dateRange.startDate || !dateRange.endDate) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx("filters")}>
      <div className={cx("select-wrapper")} data-label="Media">
        <select
          className={cx("fill")}
          value={media || ""}
          onChange={(e) => handleMediaChange(e)}
        >
          <option value="">All</option>
          {medias.map((m) => (
            <option key={m.mediumId} value={m.mediumName}>
              {m.mediumName}
            </option>
          ))}
        </select>
      </div>

      <div className={cx("select-wrapper")} data-label="Metrics">
        <select
          className={cx("fill")}
          value={eventName || "Metrics"}
          onChange={(e) => handleEventNameChange(e)}
        >
          {eventNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={cx("select-wrapper")} data-label="Date Range">
        <div className={cx("fill")}>
          <DateRangePickerComponent
            initialRange={{
              startDate: new Date(dateRange.startDate),
              endDate: new Date(dateRange.endDate),
            }}
            onDateChange={handleDateRangeChange}
          />
        </div>
      </div>

      <div className={cx("select-wrapper")} data-label="Campaign">
        <select
          className={cx("fill")}
          value={campaign || "Campaign"}
          onChange={handleCampaignChange}
        >
          <option value="">Campaign</option>
          {campaigns.map((c) => (
            <option key={c.campaignId} value={c.campaignName}>
              {c.campaignName}
            </option>
          ))}
        </select>
      </div>
    </Box>
  );
};

export default DashboardFilters;
