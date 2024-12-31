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
  const [campaign, setCampaign] = useState('');

  const mediums = ['Medium A', 'Medium B', 'Medium C'];
  const dimensions = ['City', 'Country', 'Device'];
  const campaigns = ['Campaign A', 'Campaign B', 'Campaign C'];


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

  const today = new Date();
  const thisYearStart = new Date(today.getFullYear(), 0, 1);
  const thisYearEnd = new Date(today.getFullYear(), 11, 31);
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

  const handleDateRangeChange = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange({
      ...dateRange,
      startDate,
      endDate: endDate > today ? today : endDate,
    });
  };

  const setThisYear = () => {
    setDateRange({
      startDate: thisYearStart,
      endDate: thisYearEnd,
      key: 'selection',
    });
  };

  const setLastYear = () => {
    setDateRange({
      startDate: lastYearStart,
      endDate: lastYearEnd,
      key: 'selection',
    });
  };

  return (
    <Box className={cx("filters")}>
      <select className={cx("fill")} value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Medium</option>
        {mediums.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select className={cx("fill")} value={dimension} onChange={(e) => setDimension(e.target.value)}>
        <option value="">EventName</option>
        {dimensions.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <Button className={cx("fill")} variant="outlined" onClick={handleTimeClick}>
        {`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
      </Button>

      <select className={cx('fill')} value={campaign} onChange={(e) => setCampaign(e.target.value)}>
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
        <Box sx={{ p: 2 }}>
          <Button variant="contained" color="primary" onClick={setThisYear} sx={{ mr: 1 }}>
            This Year
          </Button>
          <Button variant="contained" color="secondary" onClick={setLastYear}>
            Last Year
          </Button>
        </Box>
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleDateRangeChange}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          maxDate={today}
        />
      </Popover>
    </Box>
  );
};

export default DashboardFilters;