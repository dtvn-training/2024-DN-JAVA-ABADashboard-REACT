import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/store';
import { Box, Card, Typography } from '@mui/material';
import styled from './submit-chart.module.scss';
import classNames from 'classnames/bind';
import LineChart from '../../../../components/line-chart/LineChart';

const cx = classNames.bind(styled);

interface FormSubmission {
  date: string;
  submissions: number;
}

const SubmitFormChart = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Form Submissions',
        data: [] as number[],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });
  const { dateRange, campaign } = useAppSelector((state) => state.filters);

  useEffect(() => {
    const getFakeFormSubmissions = () => {
      // Generate fake data
      const fakeData: FormSubmission[] = [
        { date: '2024-01-01', submissions: 10 },
        { date: '2024-01-02', submissions: 15 },
        { date: '2024-01-03', submissions: 8 },
        { date: '2024-01-04', submissions: 20 },
        { date: '2024-01-05', submissions: 5 },
        { date: '2024-01-06', submissions: 12 },
        { date: '2024-01-07', submissions: 18 },
      ];
      const formattedData = formatChartData(fakeData);
      setChartData(formattedData);
    };

    getFakeFormSubmissions();
  }, [dateRange, campaign]);

  const formatChartData = (data: FormSubmission[]) => {
    return {
      labels: data.map((entry) => entry.date),
      datasets: [
        {
          label: 'Form Submissions',
          data: data.map((entry) => entry.submissions),
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  return (
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Submit Chart</Typography>
        <div className={cx('chart')}>
          <LineChart data={chartData.datasets[0].data} labels={chartData.labels} />
        </div>
      </Card>
    </Box>
  );
};

export default SubmitFormChart;