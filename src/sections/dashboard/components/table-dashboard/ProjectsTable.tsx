import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import styles from './table.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Project {
  name: string;
  status: string;
  totalBudget: string;
  budgetLeft: string;
  location: string;
  startDate: string;
  endDate: string;
}

const ProjectsTable = ({ rows }: { rows: Project[] }) => {
  return (
    <TableContainer component={Paper} className={cx('table-container')}>
      <Table className={cx('table')}>
        <TableHead className={cx('table-head')}>
          <TableRow>
            <TableCell padding="checkbox" className={cx('checkbox-cell')}>
              <Checkbox />
            </TableCell>
            <TableCell className={cx('table-head-cell')}>Name</TableCell>
            <TableCell className={cx('table-head-cell')}>Status</TableCell>
            <TableCell className={cx('table-head-cell')}>Total Budget</TableCell>
            <TableCell className={cx('table-head-cell')}>Budget Left</TableCell>
            <TableCell className={cx('table-head-cell')}>Location</TableCell>
            <TableCell className={cx('table-head-cell')}>Start Date</TableCell>
            <TableCell className={cx('table-head-cell')}>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className={cx('table-body-row')}>
              <TableCell padding="checkbox" className={cx('checkbox-cell')}>
                <Checkbox />
              </TableCell>
              <TableCell className={cx('table-body-cell')}>{row.name}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.status}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.totalBudget}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.budgetLeft}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.location}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.startDate}</TableCell>
              <TableCell className={cx('table-body-cell')}>{row.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;