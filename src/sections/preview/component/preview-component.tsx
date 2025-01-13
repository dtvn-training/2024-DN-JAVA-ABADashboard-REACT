import { Box, Button, Grid2, TextField, IconButton, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./preview-component.module.scss";
import classNames from "classnames/bind";
import SearchIcon from "@mui/icons-material/Search";
import {
  activeUserStats,
  countryStats,
  eventStats,
  referralStats,
} from "../../../utils/_mock-data";
import { TableReport } from "../../../components/table-report";
import { useState } from "react";
import { DateTimePicker } from "../../../components/date-time-picker";
import useRouter from "../../../hooks/useRouter";
import * as XLSX from "xlsx";

const cx = classNames.bind(styles);
const PreviewComponent = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateRangeChange = (range: {
    startDate: Date;
    endDate: Date;
  }) => {};
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // 1. Định dạng dữ liệu Sheet 1 (Active User Statistics)
    const activeUserSheetData = [
      activeUserStats.categories, // Tiêu đề cột
      ...activeUserStats.data.map((item) => [item.title, item.value]), // Dữ liệu
    ];
    const activeUserSheet = XLSX.utils.aoa_to_sheet(activeUserSheetData);

    // 2. Định dạng dữ liệu Sheet 2 (User Stats by Country)
    const userStatsSheetData = [
      countryStats.categories, // Tiêu đề cột
      ...countryStats.data.map((item) => [item.title, item.value]),
    ];
    const userStatsSheet = XLSX.utils.aoa_to_sheet(userStatsSheetData);

    // 3. Style tiêu đề
    const styleHeader = {
      font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4CAF50" } }, // Màu nền xanh lá
      alignment: { horizontal: "center", vertical: "center" }, // Căn giữa
    };

    // 4. Style dòng dữ liệu (Zebra pattern)
    const styleDataEven = {
      fill: { fgColor: { rgb: "E8F5E9" } }, // Màu nền xanh nhạt
    };

    const styleDataOdd = {
      fill: { fgColor: { rgb: "FFFFFF" } }, // Màu nền trắng
    };

    // 5. Áp dụng style cho các ô
    const applyStyles = (sheet:any, data: any ) => {
      const range = XLSX.utils.decode_range(sheet["!ref"]); // Lấy phạm vi của sheet
      console.log(range);
      
      for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (!sheet[cellAddress]) continue;

          // Tiêu đề
          if (row === 0) {
            sheet[cellAddress].s = styleHeader;
          }
          // Dữ liệu
          else {
            sheet[cellAddress].s = row % 2 === 0 ? styleDataEven : styleDataOdd;
          }
        }
      }

      // Viền cho các ô
      Object.keys(sheet).forEach((cell) => {
        if (cell[0] === "!") return;
        if (!sheet[cell].s) sheet[cell].s = {};
        sheet[cell].s.border = {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        };
      });
    };

    applyStyles(activeUserSheet, activeUserSheetData);
    applyStyles(userStatsSheet, userStatsSheetData);

    XLSX.utils.book_append_sheet(wb, activeUserSheet, "Active User Stats");
    XLSX.utils.book_append_sheet(wb, userStatsSheet, "Users by Country");
    console.log(wb);
    

    // Ghi file
    XLSX.writeFile(wb, "UserStatisticsWithStyling.xlsx");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#ffffff" }}>
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        component="div"
        className={cx("header")}
        mb={3}
      >
        <Box component="div" className={cx("box-left")}>
          <IconButton
            onClick={handleClick}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className={cx("btn-filter")}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <DateTimePicker
              initialRange={{
                startDate: new Date(),
                endDate: new Date(),
              }}
              onDateChange={handleDateRangeChange}
              onClose={handleClose}
            />
          </Menu>
          <TextField
              className={cx("input")}
              variant="outlined"
              size="small"
              placeholder="File name"
              defaultValue="Report today"
            />
        </Box>
        <Box component="div" className={cx("box-right")}>
          <Button
            variant="contained"
            className={cx("back-btn")}
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Back
          </Button>
          <Button className={cx("download-btn")} onClick={exportToExcel}>
            <FileDownloadIcon />
            Download
          </Button>
        </Box>
      </Grid2>
      <Grid2 container spacing={3} sx={{ padding: 4, backgroundColor: '#ffffff' }}>
        <TableReport
          data={activeUserStats.data}
          header={activeUserStats.header}
          categories={activeUserStats.categories}
        />
        <TableReport
          data={countryStats.data}
          header={countryStats.header}
          categories={countryStats.categories}
        />
        <TableReport
          data={eventStats.data}
          header={eventStats.header}
          categories={eventStats.categories}
        />
        <TableReport
          data={referralStats.data}
          header={referralStats.header}
          categories={referralStats.categories}
        />
      </Grid2>
    </Box>
  );
};

export default PreviewComponent;
