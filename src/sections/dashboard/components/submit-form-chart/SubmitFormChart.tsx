import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/store';
import { Box, Card, Typography } from '@mui/material';
import styled from './submit-chart.module.scss';
import classNames from 'classnames/bind';
import LineChart from '../../../../components/line-chart/LineChart';
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
const cx = classNames.bind(styled);

const SubmitFormChart = () => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
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

    const getSubmitChartData = () => {
      const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

      const dateRange = generateDateRange(formattedStartDate, formattedEndDate);

      const filteredData =
        chartEvent?.filter((event) => event.eventTitle === 'form submission') || [];

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

      setChartLabels(labels);
      setChartData(data);
    };

    getSubmitChartData();
  }, [chartEvent, startDate, endDate]);

  return (
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Submit Form</Typography>
        <div className={cx('chart')}>
          <LineChart data={chartData} labels={chartLabels} />
        </div>
      </Card>
    </Box>
  );
};

export default SubmitFormChart;
