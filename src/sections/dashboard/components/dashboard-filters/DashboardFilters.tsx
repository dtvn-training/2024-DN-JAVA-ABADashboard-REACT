import React, { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from "./dashboard-filters.module.scss";
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { setDateRange } from '../../../../redux/dashboard-slice/filtersSlice';

const cx = classNames.bind(styled);

const DashboardFilters: React.FC = () => {
  const [medium, setMedium] = useState('Medium');
  const [eventName, setEventName] = useState('eventName');
  const [campaign, setCampaign] = useState('');

  const mediums = ['Medium A', 'Medium B', 'Medium C'];
  const eventNames = ['eventName', 'city', 'source', 'pageTitle', 'pagePath', 'medium', 'date'];
  const campaigns = ['Campaign A', 'Campaign B', 'Campaign C'];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(state => state.filters.dateRange);

  const handleTimeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTimeClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'time-picker-popover' : undefined;

  const today = new Date();

  const handleDateRangeChange = (ranges: any) => {
    const { selection } = ranges;
    const endDate = selection.endDate > today ? today : selection.endDate;
    dispatch(setDateRange({
      startDate: selection.startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  const setThisYear = () => {
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date();
    dispatch(setDateRange({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  const setLastYear = () => {
    const startDate = new Date(new Date().getFullYear() - 1, 0, 1);
    const endDate = new Date(new Date().getFullYear() - 1, 11, 31);
    dispatch(setDateRange({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }));
  };

  return (
    <Box className={cx("filters")}>
      <select className={cx("fill")} value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Medium</option>
        {mediums.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select className={cx("fill")} value={eventName} onChange={(e) => setEventName(e.target.value)}>
        {eventNames.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <Button className={cx("fill")} variant="outlined" onClick={handleTimeClick}>
        {`${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}`}
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
          ranges={[{
            startDate: new Date(dateRange.startDate),
            endDate: new Date(dateRange.endDate),
            key: 'selection',
          }]}
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