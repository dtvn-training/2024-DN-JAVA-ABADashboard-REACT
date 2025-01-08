import React, { useEffect, useState } from "react";
import { Button, Popover } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerComponentProps {
  initialRange: { startDate: Date; endDate: Date };
  onDateChange: (range: { startDate: Date; endDate: Date }) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  initialRange,
  onDateChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [range, setRange] = useState(initialRange);

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
    const newRange = { startDate: selection.startDate, endDate: newEndDate };
    console.log("thời gian ", newRange);
    setRange(newRange);
    onDateChange(newRange);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-picker-popover" : undefined;
  console.log("range", range);

  return (
    <>
      <Button variant="outlined" onClick={handleTimeClick} type="button">
        {`${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`}
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
        <DateRangePicker
          ranges={[
            {
              startDate: range.startDate,
              endDate: range.endDate,
              key: "selection",
            },
          ]}
          onChange={handleRangeChange}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          maxDate={new Date()}
        />
      </Popover>
    </>
  );
};

export default DateRangePickerComponent;
