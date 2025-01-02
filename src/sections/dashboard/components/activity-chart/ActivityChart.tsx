import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import BarChart from '../../../../components/bar-chart/BarChart';
import LoadingSpinner from '../../../../components/loading-spinner/loading-spinner';
import styled from "./activity-chart.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styled);

interface ActivityChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
  }[];
}

const ActivityChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState<ActivityChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fake data for activity chart
        const fakeData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Activity',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
        setActivityData(fakeData);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !activityData) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx("chart-container")}>
      <Card className={cx("chart-card")}>
        <Typography className={cx("chart-title")}>Activity Chart</Typography>
        <div className={cx("chart")}>
          <BarChart 
            data={activityData.datasets[0].data} 
            labels={activityData.labels} 
            backgroundColor={activityData.datasets[0].backgroundColor} 
            borderColor={activityData.datasets[0].borderColor} 
            borderWidth={activityData.datasets[0].borderWidth} 
          />
        </div>
      </Card>
    </Box>
  );
};

export default ActivityChart;