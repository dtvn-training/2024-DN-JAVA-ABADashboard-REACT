import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import LineChart from '../../../../components/line-chart/LineChart';
import LoadingSpinner from '../../../../components/loading-spinner/loading-spinner';
import styled from './purchases-chart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styled);

const PurchasesChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [purchaseData, setPurchaseData] = useState<number[]>([]);
  const [purchaseLabels, setPurchaseLabels] = useState<string[]>([]);

  useEffect(() => {
    const getPurchaseData = async () => {
      setLoading(true);
      try {
        // Fake data for purchases
        const fakeData = [
          { date: "2023-01-01", count: 10 },
          { date: "2023-01-02", count: 15 },
          { date: "2023-01-03", count: 20 },
          { date: "2023-01-04", count: 25 },
          { date: "2023-01-05", count: 30 },
        ];
        const labels = fakeData.map((purchase) => purchase.date);
        const values = fakeData.map((purchase) => purchase.count);
        setPurchaseLabels(labels);
        setPurchaseData(values);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      } finally {
        setLoading(false);
      }
    };

    getPurchaseData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box className={cx('chart-container')}>
      <Card className={cx('chart-card')}>
        <Typography className={cx('chart-title')}>Purchases Chart</Typography>
        <div className={cx('chart')}>
          <LineChart data={purchaseData} labels={purchaseLabels} />
        </div>
      </Card>
    </Box>
  );
};

export default PurchasesChart;