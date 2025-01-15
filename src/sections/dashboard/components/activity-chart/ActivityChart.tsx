import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import BarChart from '../../../../components/bar-chart/BarChart';
import LoadingSpinner from '../../../../components/loading-spinner/loading-spinner';
import styled from './activity-chart.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from '../../../../redux/store';
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
const cx = classNames.bind(styled);

const ActivityChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState<number[]>([]);
  const [activityLabels, setActivityLabels] = useState<string[]>([]);
  const { chartEvent } = useAppSelector((state) => state.events);
  const { startDate, endDate } = useAppSelector((state) => state.filters.dateRange);

  useEffect(() => {
    const generateDateRange = (start: string, end: string) => {
      const dates = [];
      let current = dayjs(start);
      const last = dayjs(end);

      while (current.isSameOrBefore(last)) {
        dates.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
      }

      return dates;
    };

    const fetchActivityData = () => {
      setLoading(true);
      try {
        const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
        const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

        const dateRange = generateDateRange(formattedStartDate, formattedEndDate);

        const filteredData =
          chartEvent?.filter((event) => event.eventTitle === 'active users') || [];

        const dataMap: { [key: string]: number } = {};
        dateRange.forEach((date) => {
          dataMap[date] = 0;
        });

        filteredData.forEach((event) => {
          const date = dayjs(event.time).format('YYYY-MM-DD');
          if (dataMap[date] !== undefined) {
            dataMap[date] += event.eventValue;
          }
        });

        const labels = dateRange;
        const data = dateRange.map((date) => dataMap[date]);

        setActivityLabels(labels);
        setActivityData(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [chartEvent, startDate, endDate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Active Users</Typography>
        <div className={cx('chart')}>
          <BarChart data={activityData} labels={activityLabels} />
        </div>
      </Card>
    </Box>
  );
};

export default ActivityChart;
