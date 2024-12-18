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
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { parseISO, format } from "date-fns";
import { GetAllTagsAction } from "../../../../redux/tag-slice/tag-slice";

const cx = classnames.bind(styled);
const rowPerOptions = [5, 10, 25];

const SectionTag = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { TagList } = useAppSelector((state) => state.tag);
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    dispatch(
      GetAllTagsAction({
        pageNum: newPage,
        pageSize: rowsPerPage,
      })
    );
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
              <TableCell>Create by</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TagList &&
              TagList.data.map((row) => (
                <TableRow key={row.name} hover>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.tagId}</TableCell>
                  <TableCell className={cx("trigger")}>
                    <div className={cx("box")}>
                      <div className={cx("icon")}>
                        <VisibilityIcon />
                      </div>
                      <span className={cx("trigger-name")}>All page</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {row.updatedAt !== null &&
                      format(parseISO(row.updatedAt), "HH:mm:ss dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>
                    <span
                      className={cx(`${row.status !== "SAVE" && "active"}`)}
                    >
                      {row.status === "SAVE" ? "Save" : "Save & push"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowPerOptions}
        component="div"
        count={TagList && TagList.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SectionTag;
