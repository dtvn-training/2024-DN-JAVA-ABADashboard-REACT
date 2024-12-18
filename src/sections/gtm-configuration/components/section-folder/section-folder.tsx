import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
  TablePagination,
  Box,
} from "@mui/material";
import { Rows } from "../rows";
import styled from "./section-folder.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styled);

const rowPerOptions = [5, 10, 25];
const SectionFolder = () => {
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
          Folder
        </Typography>
        <button>
          <span>Move</span>
        </button>
      </Box>
      <TableContainer className={cx("table", "section-folder")}>
        <Table aria-label="collapsible table">
          <TableBody>
            <Rows />
            <Rows />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowPerOptions}
        component="div"
        count={4}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SectionFolder;
