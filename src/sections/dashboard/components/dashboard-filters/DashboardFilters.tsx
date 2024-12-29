import React, { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { DateRangePicker}from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import styled from"./dashboard-filters.module.scss";
import classNames from 'classnames/bind';

const cx = classNames.bind(styled);

const DashboardFilters: React.FC = () => {
  const [medium, setMedium] = useState('Medium');
  const [event, setEvent] = useState('Event');
  const [campaign, setCampaign] = useState('Campaign');

  const mediums = ['Medium A', 'Medium B', 'Medium C'];
  const events = ['Event A', 'Event B', 'Event C'];
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

  return (
    <Box className={cx("filters")} >
      <select className={cx("fill")} value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Chọn Medium</option>
        {mediums.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select className={cx("fill")} value={event} onChange={(e) => setEvent(e.target.value)}>
        <option value="">Chọn Event</option>
        {events.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>

      <Button className={cx("fill")} variant="outlined" onClick={handleTimeClick}>
        {`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
      </Button>
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
          // showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
        />
      </Popover>

      <select className={cx("fill")} value={campaign} onChange={(e) => setCampaign(e.target.value)}>
        <option value="">Chọn Campaign</option>
        {campaigns.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </Box>
  );
};

export default DashboardFilters;
