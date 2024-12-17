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
  Box,
} from "@mui/material";
import styled from "./section-variable.module.scss";
import classnames from "classnames/bind";

interface PropsStyles {
  recentSales: {
    id: string;
    customer: string;
    amount: number;
    date: string;
  }[];
}
const cx = classnames.bind(styled);

const rowPerOptions=[5, 10, 25];
const SectionVariable = (props: PropsStyles) => {
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
      <Box component="div" className={cx("box-header")}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Variable
        </Typography>
        <button>
          <span>Configure</span>
        </button>
      </Box>

      <TableContainer className={cx("table", "section-variable")}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Variable name</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.recentSales
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
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

export default SectionVariable;
