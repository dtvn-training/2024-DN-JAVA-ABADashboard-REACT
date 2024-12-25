import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DonutChartProps {
  data: number[];
  labels: string[];
  colors: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data, labels, colors }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  return <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default DonutChart;