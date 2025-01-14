import {
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./table-report.module.scss";
import classNames from "classnames/bind";
import { PreviewInterface } from "../interface/interface";
import { format } from 'date-fns';


const cx = classNames.bind(styles);
const TableReport = (props: PreviewInterface) => {
  return (
    <Grid2 component="div" className={cx("report-item")}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" mb={2}>
          {props.header}
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {props.categories.map((row,index)=>{
                    return <TableCell align={index===2?'right':'left'} key={index}>{row}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((row,index) => (
                <TableRow key={index}>
                  <TableCell>{format(row.dateEventOccurred,"yyyy-MM-dd")}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid2>
  );
};

export default TableReport;
