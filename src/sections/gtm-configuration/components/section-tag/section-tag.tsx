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
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "./section-tag.module.scss";

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

const SectionTag = (props: PropsStyles) => {
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
      className={cx("wrapper")}
      sx={{
        width: "100vw",
        overflow: "hidden",
        textAlign: "start",
        marginBottom: "3rem",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Tag
      </Typography>
      <TableContainer
        className={cx("table", "section-table-same", "section-tag")}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Triggers</TableCell>
              <TableCell>Updated date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.recentSales
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell className={cx("trigger")}>
                    <div className={cx("box")}>
                      <div className={cx("icon")}>
                        <VisibilityIcon />
                      </div>
                      <span className={cx("trigger-name")}>All page</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <span>Save</span>
                  </TableCell>
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

export default SectionTag;
