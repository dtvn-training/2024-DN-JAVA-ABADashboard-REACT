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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import styled from "./gtm-configuration.module.scss";
import classnames from "classnames/bind";
import { useState } from "react";
import React from "react";
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

const cx = classnames.bind(styled);
const recentSales = [
  { id: "TR001", customer: "John Doe", amount: 1200, date: "2024-01-15" },
  { id: "TR002", customer: "Jane Smith", amount: 850, date: "2024-01-14" },
  { id: "TR003", customer: "Bob Wilson", amount: 2300, date: "2024-01-13" },
  { id: "TR004", customer: "Alice Brown", amount: 760, date: "2024-01-12" },
  { id: "TR005", customer: "Charlie Davis", amount: 1500, date: "2024-01-11" },
];

type ButtonListStyle = {
  label: string;
  icon: JSX.Element;
};

const buttonList: ButtonListStyle[] = [
  {
    label: "Tag",
    icon: <AddIcon />,
  },
  {
    label: "Trigger",
    icon: <AddIcon />,
  },
  {
    label: "Variable",
    icon: <AddIcon />,
  },
  {
    label: "Folder",
    icon: <AddIcon />,
  },
];

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData1(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows1 = [
  createData1(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData1(2, 'Donut', 452, 25.0, 51, 4.9),
  createData1(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData1(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData1(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData1(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData1(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData1(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData1(9, 'KitKat', 518, 26.0, 65, 7.0),
  createData1(10, 'Lollipop', 392, 0.2, 98, 0.0),
  createData1(11, 'Marshmallow', 318, 0, 81, 2.0),
  createData1(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData1(13, 'Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row() {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    
    if (event.target.checked) {
      console.log(123);
      
      const newSelected = rows1.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows1]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <Box component="div" className={cx("box")} onClick={()=>setOpen(!open)}>
          <div>Items are removed from the folder</div>
          <div className={cx("actions")} >
            <div className={cx("icon-dropdown")}>
              {open?(
                <React.Fragment>
                  <i className="fa-solid fa-angle-down"></i>
                  <i className="fa-solid fa-angle-up"></i>
                </React.Fragment>
              ):(
                <React.Fragment>
                  <i className="fa-solid fa-angle-up"></i>
                  <i className="fa-solid fa-angle-down"></i>
                </React.Fragment>
              )}
              
              
            </div>
            <div className={cx("icon-menu")}>
              <MoreVertIcon />
            </div>
          </div>
        </Box>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {open && (
            <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows1.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          )}
          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const GtmConfigurationComponent = () => {
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
    <div className={cx("container")}>
      <div className={cx("section-actions")}>
        {buttonList.map((buttonItem, index) => {
          return (
            <div key={index} className={cx("button")}>
              <span>{buttonItem.label}</span>
              {buttonItem.icon}
            </div>
          );
        })}
      </div>
      <Paper
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
              {recentSales
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
              {recentSales
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
              {recentSales
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
              <Row />
              <Row />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default GtmConfigurationComponent;
