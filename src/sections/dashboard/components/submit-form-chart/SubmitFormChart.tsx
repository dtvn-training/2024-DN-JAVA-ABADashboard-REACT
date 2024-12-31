import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../../../redux/store';

const SubmitFormChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Form Submissions',
        data: [],
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
      const fakeData = [
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

  const formatChartData = (data) => {
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
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default SubmitFormChart;