import React, { useEffect, useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import classNames from "classnames/bind";
import styled from "./DateRangePicker.module.scss";

const cx = classNames.bind(styled);

interface DateRangePickerComponentProps {
  initialRange: { startDate: Date; endDate: Date };
  onDateChange: (range: { startDate: Date; endDate: Date }) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  initialRange,
  onDateChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: initialRange.startDate, endDate: initialRange.endDate });

  useEffect(() => {
    setRange(initialRange);
  }, [initialRange]);

  const handleTimeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTimeClose = () => {
    setAnchorEl(null);
  };

  const handleRangeChange = (ranges: any) => {
    const { selection } = ranges;
    const today = new Date();
    const newEndDate = selection.endDate > today ? today : selection.endDate;
    const newRange = {
      startDate: selection.startDate || today,
      endDate: newEndDate || today,
    };
    setRange(newRange);
    onDateChange(newRange as { startDate: Date; endDate: Date });
  };


  const open = Boolean(anchorEl);
  const id = open ? "date-picker-popover" : undefined;

  return (
    <>
      <Button
        className={cx("boxCustom")}
        onClick={handleTimeClick}
        type="button"
      >
        {range.startDate && range.endDate
          ? `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`
          : "Select Date Range"}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleTimeClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          className={cx("boxCustom")}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DateRangePicker
            ranges={[
              {
                startDate: range.startDate || new Date(),
                endDate: range.endDate || new Date(),
                key: "selection",
              },
            ]}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            maxDate={new Date()}
          />

        </Box>
      </Popover>
    </>
  );
};

export default DateRangePickerComponent;
