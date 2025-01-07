import React, { useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import LineChart from "../../../../components/line-chart/LineChart";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import styled from "./purchases-chart.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../redux/store";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
const cx = classNames.bind(styled);

const PurchasesChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [purchaseData, setPurchaseData] = useState<number[]>([]);
  const [purchaseLabels, setPurchaseLabels] = useState<string[]>([]);
  const { chartEvent } = useAppSelector((state) => state.events);
  const { startDate, endDate } = useAppSelector(
    (state) => state.filters.dateRange
  );

  useEffect(() => {
    const generateDateRange = (start: string, end: string) => {
      const dates = [];
      let current = dayjs(start);
      const last = dayjs(end);

      while (current.isSameOrBefore(last)) {
        dates.push(current.format("YYYY-MM-DD"));
        current = current.add(1, "day");
      }

      return dates;
    };

    const groupDataByInterval = (
      data: any[],
      interval: "day" | "week" | "month",
      dateRange: string[]
    ) => {
      const grouped: { [key: string]: number } = {};

      dateRange.forEach((date) => {
        grouped[date] = 0;
      });

      data.forEach((event) => {
        const key = dayjs(event.time).startOf(interval).format("YYYY-MM-DD");
        if (grouped[key] !== undefined) {
          grouped[key] += event.eventValue;
        }
      });

      return Object.entries(grouped).map(([key, value]) => ({
        label: key,
        value,
      }));
    };

    const getPurchaseData = () => {
      setLoading(true);
      try {
        const filteredData =
          chartEvent?.filter(
            (event) =>
              event.eventTitle === "purchase" &&
              dayjs(event.time).isBetween(startDate, endDate, null, "[]")
          ) || [];

        const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
        const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

        const dateRange = generateDateRange(
          formattedStartDate,
          formattedEndDate
        );

        const interval =
          dateRange.length <= 15
            ? "day"
            : dateRange.length <= 90
            ? "week"
            : "month";

        const groupedData = groupDataByInterval(
          filteredData,
          interval,
          dateRange
        );

        const labels = groupedData.map((item) => item.label);
        const values = groupedData.map((item) => item.value);

        setPurchaseLabels(labels);
        setPurchaseData(values);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      } finally {
        setLoading(false);
      }
    };

    getPurchaseData();
  }, [chartEvent]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx("chart-container")}>
      <Card className={cx("chart-card")}>
        <Typography className={cx("chart-title")}>Purchases</Typography>
        <div className={cx("chart")}>
          <LineChart data={purchaseData} labels={purchaseLabels} />
        </div>
      </Card>
    </Box>
  );
};

export default PurchasesChart;
