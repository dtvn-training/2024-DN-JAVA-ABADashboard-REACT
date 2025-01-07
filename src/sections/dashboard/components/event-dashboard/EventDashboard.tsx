import React, { useState } from "react";
import styled from "./event-dashboard.module.scss";
import classNames from "classnames/bind";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import NoDataPlaceholder from "../../../../components/no-data-or-error/NoDataPlaceholder";
import { useAppSelector } from "../../../../redux/store";

const cx = classNames.bind(styled);

interface Event {
  eventName: string;
  eventValue: number; // Đổi từ string sang number nếu cần
}

const EventDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { eventTable, error, loading, totalElements } = useAppSelector(
    (state) => state.events
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData =
    eventTable?.content?.map((item) => ({
      eventName: item.eventName,
      eventValue: item.totalValue, 
    })) || [];

  return (
    <Box className={cx("container")}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Key events by Event name
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} className={cx("table-container")}>
        <Table size="small" aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>EVENT NAME</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                KEY EVENTS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography color="error">Error loading data</Typography>
                </TableCell>
              </TableRow>
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <NoDataPlaceholder />
                </TableCell>
              </TableRow>
            ) : (
              currentData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Event, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.eventName}</TableCell>
                    <TableCell align="right">{row.eventValue}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={cx("pagination-container")}>
        <TablePagination
          rowsPerPageOptions={[6]}
          component="div"
          count={totalElements || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default EventDashboard;
