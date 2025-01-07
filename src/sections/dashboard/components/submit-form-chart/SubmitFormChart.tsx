import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/store';
import { Box, Card, Typography } from '@mui/material';
import styled from './submit-chart.module.scss';
import classNames from 'classnames/bind';
import LineChart from '../../../../components/line-chart/LineChart';
import dayjs from 'dayjs';

const cx = classNames.bind(styled);

const SubmitFormChart = () => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const { chartEvent } = useAppSelector((state) => state.events);

  useEffect(() => {
    const getSubmitChartData = () => {
      const filteredData = chartEvent?.filter(
        (event) => event.eventTitle === 'form submission'
      ) || [];

      const labels = filteredData.map((event) => dayjs(event.time).format('YYYY-MM-DD'));
      const data = filteredData.map((event) => event.eventValue);

      if (labels.length === 1 && data.length === 1) {
        labels.push(labels[0]);
        data.push(data[0]);
      }

      setChartLabels(labels);
      setChartData(data);
    };

    getSubmitChartData();
  }, [chartEvent]);

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
