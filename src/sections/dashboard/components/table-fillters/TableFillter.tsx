import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import styles from './table-fillter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TableFillter = () => {
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: null | HTMLElement }>({});
  const [selectedFilter, setSelectedFilter] = React.useState({
    status: "All Status",
    location: "All Locations",
    date: "Date",
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>, type: string) => {
    setAnchorEl({ [type]: event.currentTarget });
  };

  const handleClose = (type: string, value?: string) => {
    if (value) {
      setSelectedFilter((prev) => ({ ...prev, [type]: value }));
    }
    setAnchorEl((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <div className={cx('filter-container')}>
      {/* Status Filter */}
      <Button
        variant="contained"
        size="medium"
        className={cx('filter-button')}
        onClick={(e) => handleClick(e, "status")}
      >
        {selectedFilter.status}
      </Button>
      <Menu
        anchorEl={anchorEl.status}
        open={Boolean(anchorEl.status)}
        onClose={() => handleClose("status")}
      >
        <MenuItem onClick={() => handleClose("status", "All Status")}>All Status</MenuItem>
        <MenuItem onClick={() => handleClose("status", "Active")}>Active</MenuItem>
        <MenuItem onClick={() => handleClose("status", "Inactive")}>Inactive</MenuItem>
      </Menu>

      {/* Location Filter */}
      <Button
        variant="contained"
        size="medium"
        className={cx('filter-button')}
        onClick={(e) => handleClick(e, "location")}
      >
        {selectedFilter.location}
      </Button>
      <Menu
        anchorEl={anchorEl.location}
        open={Boolean(anchorEl.location)}
        onClose={() => handleClose("location")}
      >
        <MenuItem onClick={() => handleClose("location", "All Locations")}>All Locations</MenuItem>
        <MenuItem onClick={() => handleClose("location", "New York")}>New York</MenuItem>
        <MenuItem onClick={() => handleClose("location", "Los Angeles")}>Los Angeles</MenuItem>
      </Menu>

      {/* Date Filter */}
      <Button
        variant="contained"
        size="medium"
        className={cx('filter-button')}
        onClick={(e) => handleClick(e, "date")}
      >
        {selectedFilter.date}
      </Button>
      <Menu
        anchorEl={anchorEl.date}
        open={Boolean(anchorEl.date)}
        onClose={() => handleClose("date")}
      >
        <MenuItem onClick={() => handleClose("date", "Today")}>Today</MenuItem>
        <MenuItem onClick={() => handleClose("date", "This Week")}>This Week</MenuItem>
        <MenuItem onClick={() => handleClose("date", "This Month")}>This Month</MenuItem>
      </Menu>
    </div>
  );
};

export default TableFillter;