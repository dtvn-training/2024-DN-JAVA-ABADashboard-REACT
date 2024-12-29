import styled from "./metrics-card.module.scss";
import { Grid, Card, Typography } from '@mui/material';
import classNames from 'classnames';

const cx= classNames.bind(styled);

const MetricsCards = () => {
  return (
    <Grid container className={cx('metrics-cards')}>
      <Grid className={cx('metrics-card')} item md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">27/80</Typography>
          <Typography variant="body2">Active Users</Typography>
        </Card>
      </Grid>
      <Grid className={cx('metrics-card')} item md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">3,298</Typography>
          <Typography variant="body2">Event Count</Typography>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">700</Typography>
          <Typography variant="body2">View Pages</Typography>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">27/80</Typography>
          <Typography variant="body2">Active Users</Typography>
        </Card>
      </Grid>
      <Grid item  md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">3,298</Typography>
          <Typography variant="body2">Event Count</Typography>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h4">700</Typography>
          <Typography variant="body2">View Pages</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MetricsCards;