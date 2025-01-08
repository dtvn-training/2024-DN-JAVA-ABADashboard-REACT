import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Popover,
  Typography,
  Slider,
} from "@mui/material";
import styles from "./table-fillter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TableFillter = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    status: "Status",
    location: "Budget",
    date: "Date",
  });

  const [budget, setBudget] = useState<number[]>([100000, 1000000]);
  const [tempBudget, setTempBudget] = useState<number[]>([100000, 1000000]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (type: string) => (event: SelectChangeEvent<string>) => {
    setSelectedFilter((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const handleBudgetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBudgetClose = () => {
    setAnchorEl(null);
    setBudget(tempBudget); // Cập nhật giá trị chính thức khi đóng Popover
  };

  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    setTempBudget(newValue as number[]); // Chỉ cập nhật giá trị tạm thời khi kéo Slider
  };

  const open = Boolean(anchorEl);
  const id = open ? "budget-popover" : undefined;

  return (
    <Box className={cx("filter-container")}>
      <FormControl variant="outlined" size="medium" className={cx("filter-control")}>
        <InputLabel>Status</InputLabel>
        <Select value={selectedFilter.status} onChange={handleChange("status")} label="Status">
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <Box className={cx("filter-control")}>
        <Button
          variant="outlined"
          onClick={handleBudgetClick}
          fullWidth
        >
          {`Budget: ${budget[0].toLocaleString()}đ - ${budget[1].toLocaleString()}đ`}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleBudgetClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 3, width: 300 }}>
            <Typography gutterBottom>Cost Range:</Typography>
            <Slider
              value={tempBudget}
              onChange={handleBudgetChange}
              valueLabelDisplay="auto"
              min={0}
              max={500000000}
              step={100000}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Typography>{`${tempBudget[0].toLocaleString()}đ`}</Typography>
              <Typography>{`${tempBudget[1].toLocaleString()}đ`}</Typography>
            </Box>
          </Box>
        </Popover>
      </Box>

      <FormControl variant="outlined" size="medium" className={cx("filter-control")}>
        <InputLabel>Date</InputLabel>
        <Select value={selectedFilter.date} onChange={handleChange("date")} label="Date">
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="This Week">This Week</MenuItem>
          <MenuItem value="This Month">This Month</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TableFillter;
