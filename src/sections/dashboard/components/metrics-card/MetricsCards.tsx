import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { fetchActiveUsers } from "../../../../services/dashboard-services/active-users-services";
import LoadingSpinner from "../../../../components/loading-spinner/loading-spinner";
import styled from "./metrics-card.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartLine, faHandPointer } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styled);

const MetricsCards = () => {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const getActiveUsers = async () => {
    //   try {
    //     const data = await fetchActiveUsers();
    //     const totalActiveUsers = data.reduce(
    //       (total, user) => total + parseInt(user.activeUsers),
    //       0
    //     );
    //     setActiveUsers(totalActiveUsers);
    //   } catch (error) {
    //     console.error("Error fetching active users:", error);
    //   }
    // };

    // getActiveUsers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Grid2 container className={cx("metrics-cards")}>
      <Grid2 className={cx("metrics-card")} size={{ md: 4 }}>
        <Card className={cx("custom-card")}>
          <div className={cx("content")}>
            <div className={cx("value")}>
              <Typography className={cx("active-users-title")}>
                Activiy User
              </Typography>
              <Typography className={cx("active-users-value")}>3,298</Typography>
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
          <Typography className={cx("active-users-value")}>3,298</Typography>
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
          <Typography className={cx("active-users-value")}>700</Typography>
          </div>
          <FontAwesomeIcon className={cx('icon')} icon={faHandPointer} />
          </div>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MetricsCards;
