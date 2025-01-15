import { Box, Button, Grid2, TextField, IconButton, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./preview-component.module.scss";
import classNames from "classnames/bind";
import { TableReport } from "../../../components/table-report";
import { ChangeEvent, useEffect, useState } from "react";
import { DateTimePicker } from "../../../components/date-time-picker";
import useRouter from "../../../hooks/useRouter";
import { createFileExcel } from "../../../utils/_create-file-excel";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { format } from "date-fns";
import {
  PreviewDataRequest,
  PreviewInterface,
} from "../../../services/preview-services/preview-type";
import { getPreviewDataAction } from "../../../redux/preview-slice/preview-slice";
import { Loader } from "../../../components/loader";

const cx = classNames.bind(styles);
const PreviewComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fileName, setFileName] = useState("");
  const [rangePicker, setRangePicker] = useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: new Date(), endDate: new Date() });
  const { previewData, loading } = useAppSelector((state) => state.preview);
  const open = Boolean(anchorEl);
  const formattedStartDate = format(rangePicker.startDate, "yyyy-MM-dd");
  const formattedEndDate = format(rangePicker.endDate, "yyyy-MM-dd");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateRangeChange = (range: { startDate: Date; endDate: Date }) => {
    setRangePicker(range);
  };

  const handleChangeInputFileName = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleClickDownload = () => {
    const valueDownloaded = {
      data: previewData,
      fileName: fileName || "Report",
      startDate: rangePicker.startDate,
      endDate: rangePicker.endDate,
    };
    createFileExcel(valueDownloaded);
  };

  const renderReportTitle = () => {
    if (
      rangePicker.startDate.toLocaleDateString() ===
      rangePicker.endDate.toLocaleDateString()
    ) {
      return `Report for ${formattedStartDate}`;
    }
    return `Report from ${formattedStartDate} to ${formattedEndDate}`;
  };

  useEffect(() => {
    if (rangePicker) {
      const data: PreviewDataRequest = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      dispatch(getPreviewDataAction(data));
    }
  }, []);

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
              initialRange={rangePicker}
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
      <Box component="div" className={cx("title")}>
        <h1>{renderReportTitle()}</h1>
      </Box>
      <Grid2
        container
        spacing={3}
        sx={{ padding: 4, backgroundColor: "#ffffff" }}
      >
        {loading ? (
          <Loader width={100} />
        ) : (
          previewData.length > 0 &&
          previewData.map((item: PreviewInterface, index: number) => {
            return (
              <TableReport
                key={index}
                data={item.data.slice(0, 8)}
                header={item.header}
                categories={item.categories}
              />
            );
          })
        )}
      </Grid2>
    </Box>
  );
};

export default PreviewComponent;
