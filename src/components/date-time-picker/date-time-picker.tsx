/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import classNames from "classnames/bind";
import styled from "./date-time-picker.module.scss";
import { PreviewDataRequest } from "../../services/preview-services/preview-type";
import { format } from "date-fns";
import { useAppDispatch } from "../../redux/store";
import { getPreviewDataAction } from "../../redux/preview-slice/preview-slice";

const cx = classNames.bind(styled);

interface DateRangePickerComponentProps {
  initialRange: { startDate: Date; endDate: Date };
  onDateChange: (range: { startDate: Date; endDate: Date }) => void;
  onClose: () => void;
}

const DateTimePicker: React.FC<DateRangePickerComponentProps> = ({
  initialRange,
  onDateChange,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [range, setRange] = useState(initialRange);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  
  useEffect(() => {
    setRange(initialRange);
  }, [initialRange]);

  const handleRangeChange = (ranges: any) => {
    const { selection } = ranges;
    const today = new Date();
    const newEndDate = selection.endDate > today ? today : selection.endDate;
    const newRange = { startDate: selection.startDate, endDate: newEndDate };
    setRange(newRange);
    onDateChange(newRange);
  };

  const handleClickApply = () => {
    onClose();
    const data: PreviewDataRequest = {
      startDate: format(range.startDate, "yyyy-MM-dd"),
      endDate: format(range.endDate, "yyyy-MM-dd"),
    };
    dispatch(getPreviewDataAction(data));
    handleRangeChange({ startDate: range.startDate, endDate: range.endDate });
  };

  
  return (
    <Box
      className={cx("boxCustom")}
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
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
        months={isMobile ? 1 : 2}
        direction={isMobile ? "vertical" : "horizontal"}
        maxDate={new Date()}
        showDateDisplay={false}
        className={cx("date-range-picker")}
      />
      <Box component="div" className={cx("submit-btn")}>
        <Button
          variant="contained"
          className={cx("cancle-btn")}
          onClick={onClose}
        >
          cancle
        </Button>
        <Button
          variant="contained"
          className={cx("apply-btn")}
          onClick={handleClickApply}
        >
          apply
        </Button>
      </Box>
    </Box>
  );
};
export default DateTimePicker;
