import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './no-data.module.scss';

const cx = classNames.bind(styles);

const NoDataPlaceholder: React.FC = () => {
  return (
    <Box className={cx('no-data-container')}>
      <Typography className={cx('no-data-text')}>No Data Available</Typography>
    </Box>
  );
};

export default NoDataPlaceholder;