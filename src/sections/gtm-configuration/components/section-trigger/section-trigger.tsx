import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import styled from "./section-trigger.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styled);
interface PropsStyles {
  recentSales: {
    id: string;
    customer: string;
    amount: number;
    date: string;
  }[];
}
const rowPerOptions=[5, 10, 25];
const SectionTrigger = (props: PropsStyles) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null
  ) => {
    if (event) {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }
  };
  return (
    <Paper
      sx={{
        width: "100vw",
        overflow: "hidden",
        textAlign: "start",
        marginBottom: "3rem",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Trigger
      </Typography>
      <TableContainer
        className={cx("table", "section-table-same", "section-trigger")}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trigger Name</TableCell>
              <TableCell>Event type</TableCell>
              <TableCell>Filter</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Last updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.recentSales
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowPerOptions}
        component="div"
        count={props.recentSales.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SectionTrigger;
