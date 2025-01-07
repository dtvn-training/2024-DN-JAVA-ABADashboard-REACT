import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import BarChart from '../../../../components/bar-chart/BarChart';
import LoadingSpinner from '../../../../components/loading-spinner/loading-spinner';
import styled from './activity-chart.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from '../../../../redux/store';

const cx = classNames.bind(styled);

const ActivityChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState<number[]>([]);
  const [activityLabels, setActivityLabels] = useState<string[]>([]);
  const { chartEvent } = useAppSelector((state) => state.events);

  useEffect(() => {
    const fetchActivityData = () => {
      try {
        const filteredData = chartEvent?.filter(
          (event) => event.eventTitle === 'active users'
        ) || [];

        const labels = filteredData.map((event) => new Date(event.time).toLocaleDateString());
        const data = filteredData.map((event) => event.eventValue);

        setActivityLabels(labels);
        setActivityData(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [chartEvent]);


  return (
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Actice User</Typography>
        <div className={cx('chart')}>
          <BarChart 
            data={activityData} 
            labels={activityLabels} 
          />
        </div>
      </Card>
    </Box>
  );
};

export default ActivityChart;
