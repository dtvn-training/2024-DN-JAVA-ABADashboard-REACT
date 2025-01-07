import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import LineChart from '../../../../components/line-chart/LineChart';
import LoadingSpinner from '../../../../components/loading-spinner/loading-spinner';
import styled from './purchases-chart.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from "../../../../redux/store";
import dayjs from 'dayjs';

const cx = classNames.bind(styled);

const PurchasesChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [purchaseData, setPurchaseData] = useState<number[]>([]);
  const [purchaseLabels, setPurchaseLabels] = useState<string[]>([]);
  const { chartEvent } = useAppSelector((state) => state.events);

  useEffect(() => {
    const groupDataByInterval = (data: any[], interval: 'day' | 'week' | 'month') => {
      const grouped: { [key: string]: number } = {};
      data.forEach((event) => {
        const key = dayjs(event.time).startOf(interval).format('YYYY-MM-DD');
        if (!grouped[key]) {
          grouped[key] = 0;
        }
        grouped[key] += event.eventValue;
      });
      return Object.entries(grouped).map(([key, value]) => ({ label: key, value }));
    };

    const getPurchaseData = () => {
      setLoading(true);
      try {
        const filteredData = chartEvent?.filter((event) => event.eventTitle === "purchase") || [];
        const interval =
          filteredData.length <= 15
            ? 'day'
            : filteredData.length <= 90
            ? 'week'
            : 'month';

        const groupedData = groupDataByInterval(filteredData, interval);

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
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Purchases</Typography>
        <div className={cx('chart')}>
          <LineChart data={purchaseData} labels={purchaseLabels} />
        </div>
      </Card>
    </Box>
  );
};

export default PurchasesChart;
