import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, {  useEffect, useState } from "react";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import styled from "./metrics-card.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartLine, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../../redux/store";

const cx = classNames.bind(styled);

const MetricsCards = () => {
  const [loading, setLoading] = useState(false);
  const {numberOfEvent} = useAppSelector(state => state.events);

  if (loading) {
    return <LoadingSpinner />;
  }

  useEffect(() => { 
    console.log('Fetching events data hahahahahahha...', numberOfEvent);
  }, []);

  return (
    <Grid2 container className={cx("metrics-cards")}>
      <Grid2 className={cx("metrics-card")} size={{ md: 4 }}>
        <Card className={cx("custom-card")}>
          <div className={cx("content")}>
            <div className={cx("value")}>
              <Typography className={cx("active-users-title")}>
               Active  User
              </Typography>
              <Typography className={cx("active-users-value")}>
               {numberOfEvent?.find((item) => item.eventTitle === "Active Users")?.totalValue || 0}
              </Typography>
            </div>
            <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
          </div>
        </Card>
      </Grid2>
      <Grid2 className={cx("metrics-card")} size={{ md: 4 }}>
        <Card className={cx("custom-card")}>
          <div className={cx("content")}>
            <div className={cx("value")}>
              <Typography className={cx("active-users-title")}>
                Event Count
              </Typography>
              <Typography className={cx("active-users-value")}>
                {numberOfEvent?.find((item) => item.eventTitle === "Event Count")?.totalValue || 0}
              </Typography>
            </div>
            <FontAwesomeIcon className={cx('icon')} icon={faChartLine} />
          </div>
        </Card>
      </Grid2>
      <Grid2 className={cx("metrics-card")} size={{ md: 4 }}>
        <Card className={cx("custom-card")}>
          <div className={cx("content")}>
            <div className={cx("value")}>
              <Typography className={cx("active-users-title")}>Click</Typography>
              <Typography className={cx("active-users-value")}>
               {numberOfEvent?.find((item) => item.eventTitle === "purchase")?.totalValue || 0}
              </Typography>
            </div>
            <FontAwesomeIcon className={cx('icon')} icon={faHandPointer} />
          </div>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MetricsCards;
