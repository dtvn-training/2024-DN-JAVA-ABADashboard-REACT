import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "./dashboard-filters.module.scss";
import classNames from "classnames/bind";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  setDateRange,
  setEventName,
  setMedia,
  setCampaign,
} from "../../../../redux/dashboard-slice/filtersSlice";
import DateRangePickerComponent from "./../../../../components/DateRangePickerComponent";

const cx = classNames.bind(styles);

const DashboardFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector((state) => state.filters.dateRange);
  const [media, setMediaState] = React.useState<string>("");
  const [eventName, setEventNameState] = React.useState<string>("");
  const [campaign, setCampaignState] = React.useState<string>("");

  const mediums = ["(None)", "Zalo"];
  const eventNames = [
    "eventName",
    "city",
    "source",
    "pageTitle",
    "pagePath",
    "medium",
    "date",
  ];
  const campaigns = ["Campaign A", "Campaign B", "Campaign C"];

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    dispatch(
      setDateRange({
        startDate: sevenDaysAgo.toISOString(),
        endDate: today.toISOString(),
      })
    );
  }, [dispatch]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMediaState(value);
    dispatch(setMedia(value));
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

  return (
    <Box className={cx("filters")}>
      <select
        className={cx("fill")}
        value={media || "Mediums"}
        onChange={handleMediaChange}
      >
        {mediums.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        className={cx("fill")}
        value={eventName || "Metrics"}
        onChange={handleEventNameChange}
      >
        {eventNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <DateRangePickerComponent
        initialRange={{
          startDate: new Date(dateRange.startDate),
          endDate: new Date(dateRange.endDate),
        }}
        onDateChange={handleDateRangeChange}
      />

      <select
        className={cx("fill")}
        value={campaign || "Campaign"}
        onChange={handleCampaignChange}
      >
        <option value="">Campaign</option>
        {campaigns.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </Box>
  );
};

export default DashboardFilters;
