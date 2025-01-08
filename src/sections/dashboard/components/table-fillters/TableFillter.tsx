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
import DateRangePickerComponent from "../../../../components/date-time-picker/DateRangePickerComponent";
import { useAppDispatch,useAppSelector } from "../../../../redux/store";
import { setDateRange } from "../../../../redux/dashboard-slice/tableFilterSlice";

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
  const {dateRange} = useAppSelector((state) => state.tableFilter);
  const dispatch = useAppDispatch();

  const handleChange = (type: string) => (event: SelectChangeEvent<string>) => {
    setSelectedFilter((prev) => ({ ...prev, [type]: event.target.value }));
  };

  const handleBudgetClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBudgetClose = () => {
    setAnchorEl(null);
    setBudget(tempBudget);
  };

  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    setTempBudget(newValue as number[]);
  };

  const handleDateRangeChange = (range: { startDate: Date; endDate: Date }) => {
      dispatch(
        setDateRange({
          startDate: range.startDate.toISOString(),
          endDate: range.endDate.toISOString(),
        })
      );
  };

  const open = Boolean(anchorEl);
  const id = open ? "budget-popover" : undefined;

  return (
    <Box className={cx("filter-container")}>
      <FormControl  size="medium" className={cx("fill")}>
        <Select value={selectedFilter.status} onChange={handleChange("status")} label="Status">
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <Box className={cx("fill")}>
        <Button
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

      <div className={cx("fill")}>
        <DateRangePickerComponent
          initialRange={{
            startDate: new Date(dateRange.startDate),
            endDate: new Date(dateRange.endDate),
          }}
          onDateChange={handleDateRangeChange}
        />
      </div>
    </Box>
  );
};

export default TableFillter;
