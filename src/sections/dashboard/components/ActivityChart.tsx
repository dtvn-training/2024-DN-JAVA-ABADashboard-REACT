import React from 'react';
import { Box, Card } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

const ActivityChart: React.FC<{ data: ActivityChartData }> = ({ data }) => {
  return (
    <Box sx={{ mt: 2 }} >
      <Card sx={{ p: 3 }}>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
          }}
          height={200}
          width={600}
        />
      </Card>
    </Box>
  );
};

export default ActivityChart;