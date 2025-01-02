import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
  labels: string[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  labels,
  backgroundColor = 'rgba(75, 192, 192, 0.2)',
  borderColor = 'rgba(75, 192, 192, 1)',
  borderWidth = 1,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data,
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
      <Bar data={chartData} options={options} />
  );
};

export default BarChart;