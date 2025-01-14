/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid2, TextField, IconButton, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./preview-component.module.scss";
import classNames from "classnames/bind";
import {
  activeUserStats,
  countryStats,
  eventStats,
  referralStats,
} from "../../../utils/_mock-data";
import { TableReport } from "../../../components/table-report";
import { ChangeEvent, useState } from "react";
import { DateTimePicker } from "../../../components/date-time-picker";
import useRouter from "../../../hooks/useRouter";
import { CreateFileExcel } from "../../../utils/_create-file-excel";

const cx = classNames.bind(styles);
const PreviewComponent = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fileName, setFileName]= useState("Report today");
  const [rangePicker, setRangePicker] = useState<{
    startDate: Date;
    endDate: Date;
  }>(
    {startDate: new Date(), endDate: new Date()}
  );
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
  }) => {
    setRangePicker(range);
  };

  const handleChangeInputFileName= (event:ChangeEvent<HTMLInputElement>)=>{
    setFileName(event.target.value);
  }
  
  const handleClickDownload= ()=>{
    const data= [];
    data.push(activeUserStats);
    data.push(countryStats);
    data.push(eventStats);
    data.push(referralStats);
    const valueDownloaded= {
      data: data,
      fileName,
      startDate: rangePicker.startDate,
      endDate: rangePicker.endDate
    }
    CreateFileExcel(valueDownloaded);
  }
  

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
            onChange={handleChangeInputFileName}
            value={fileName}
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
          <Button className={cx("download-btn")} onClick={handleClickDownload}>
            <FileDownloadIcon />
            Download
          </Button>
        </Box>
      </Grid2>
      <Grid2
        container
        spacing={3}
        sx={{ padding: 4, backgroundColor: "#ffffff" }}
      >
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
