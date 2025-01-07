import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from "@mui/material";
import styles from './table-fillter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TableFillter = () => {
  const [selectedFilter, setSelectedFilter] = React.useState({
    status: "All Status",
    location: "All Locations",
    date: "Date",
  });

  const handleChange = (type: string) => (event: SelectChangeEvent<string>) => {
    setSelectedFilter((prev) => ({ ...prev, [type]: event.target.value }));
  };

  return (
    <Box className={cx('filter-container')}>
      <FormControl variant="outlined" size="medium" className={cx('filter-control')}>
        <InputLabel>Status</InputLabel>
        <Select
          value={selectedFilter.status}
          onChange={handleChange("status")}
          label="Status"
        >
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {/* Location Filter */}
      <FormControl variant="outlined" size="medium" className={cx('filter-control')}>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedFilter.location}
          onChange={handleChange("location")}
          label="Location"
        >
          <MenuItem value="All Locations">All Locations</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="Los Angeles">Los Angeles</MenuItem>
        </Select>
      </FormControl>

      {/* Date Filter */}
      <FormControl variant="outlined" size="medium" className={cx('filter-control')}>
        <InputLabel>Date</InputLabel>
        <Select
          value={selectedFilter.date}
          onChange={handleChange("date")}
          label="Date"
        >
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="This Week">This Week</MenuItem>
          <MenuItem value="This Month">This Month</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TableFillter;
