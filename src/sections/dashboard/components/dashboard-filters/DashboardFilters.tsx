import React, { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from "./dashboard-filters.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styled);

const DashboardFilters: React.FC = () => {
  const [medium, setMedium] = useState('Medium');
  const [dimension, setDimension] = useState('');
  const [metric, setMetric] = useState('');
  const [campaign, setCampaign] = useState('');

  const mediums = ['Medium A', 'Medium B', 'Medium C'];
  const dimensions = ['City', 'Country', 'Device'];
  const campaigns = ['Campaign A', 'Campaign B', 'Campaign C'];
  const metricsByDimension: { [key: string]: string[] } = {
    City: ['Active Users', 'Sessions', 'Page Views'],
    Country: ['Active Users', 'Sessions', 'Bounce Rate'],
    Device: ['Active Users', 'Sessions', 'Conversions'],
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleTimeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTimeClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'time-picker-popover' : undefined;

  return (
    <Box className={cx("filters")}>
      <select className={cx("fill")} value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Medium</option>
        {mediums.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select className={cx("fill")} value={dimension} onChange={(e) => setDimension(e.target.value)}>
        <option value="">Dimension</option>
        {dimensions.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {dimension && (
        <select className={cx("fill")} value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="">Metric</option>
          {metricsByDimension[dimension].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      )}

      <Button className={cx("fill")} variant="outlined" onClick={handleTimeClick}>
        {`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
      </Button>

      <select className={cx("fill")} value={campaign} onChange={(e) => setCampaign(e.target.value)}>
        <option value="">Campaign</option>
        {campaigns.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleTimeClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          ranges={[dateRange]}
          onChange={(item: any) => setDateRange(item.selection)}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          maxDate={new Date()} 
        />
      </Popover>
    </Box>
  );
};

export default DashboardFilters;