import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const data = [
  { eventName: "page_view", keyEvents: 53 },
  { eventName: "scroll", keyEvents: 15 },
  { eventName: "session_start", keyEvents: 13 },
  { eventName: "first_visit", keyEvents: 8 },
  { eventName: "test", keyEvents: 2 },
  { eventName: "click", keyEvents: 25 },
  { eventName: "purchase", keyEvents: 5 },
  { eventName: "signup", keyEvents: 10 },
  { eventName: "login", keyEvents: 20 },
  { eventName: "logout", keyEvents: 7 },
];

const EventDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 2 }}>
      {/* Title Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Key events by Event name
        </Typography>
        <Box>
          <IconButton aria-label="filter">
            <FilterListIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="check">
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.eventName}</TableCell>
                <TableCell align="right">{row.keyEvents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EventDashboard;