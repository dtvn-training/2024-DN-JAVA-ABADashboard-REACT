import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  ArcElement,
  ChartDataLabels
);

ChartJS.register({
  id: 'centerText',
  beforeDraw: (chart) => {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
    const fontSize = (height / 114).toFixed(2);
    ctx.restore();
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = 'middle';
    
    const text = chart.options.plugins?.centerText?.text;
    const textX = Math.round((left + right) / 2);
    const textY = Math.round((top + bottom) / 2);
    
    ctx.fillStyle = chart.options.plugins?.centerText?.color;
    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});

interface TopicsChartsProps {
  weakestTopicsData: any;
  strongestTopicsData: any;
}

const renderDoughnutChart = (label: string, data: number[], backgroundColor: string[]) => {
  const total = data.reduce((acc, val) => acc + val, 0);
  const percentage = ((data[0] / total) * 100).toFixed(2);

  return (
    <Grid item xs={4}>
      <Doughnut
        data={{
          labels: [label],
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: { enabled: false },
            datalabels: {
              display: true,
              formatter: () => `${percentage}%`,
              color: 'white',
            },
            centerText: {
              display: true,
              text: `${data[0]}`,
              color: 'white',
              font: {
                size: '30',
              },
            },
          },
          cutout: "70%",
        }}
      />
      <Typography align="center" variant="body1" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Grid>
  );
};

const TopicsCharts: React.FC<TopicsChartsProps> = ({ weakestTopicsData, strongestTopicsData }) => {
  return (
    <Grid container>
      <Grid container md={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">
              Weakest Topics
            </Typography>
            <Grid container>
              {renderDoughnutChart("Total Project", [81, 19], ["#FF7043", "#F5F5F5"])}
              {renderDoughnutChart("Total Engagement", [62, 38], ["#FFA726", "#F5F5F5"])}
              {renderDoughnutChart("Customer Growth", [22, 78], ["#FFCC80", "#F5F5F5"])}
            </Grid>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default TopicsCharts;