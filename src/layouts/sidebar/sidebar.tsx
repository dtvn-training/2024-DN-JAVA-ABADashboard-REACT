import { useState } from "react";
import { Box, List,  ListItemIcon, ListItemText } from "@mui/material";
import {FaTachometerAlt, FaCog, FaChartBar } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import classNames from "classnames/bind";
import styled from "./sidebar.module.scss";


const cx = classNames.bind(styled);

const SideBar = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const handleViewChange = (view:string) => {
    setSelectedView(view);
  };
  return (
    <Box className={cx("container")} sx={{ overflow: "auto", mt: 8 }}>
          <div className={cx("logo")}>
            <img src={Logo} alt="ABA Logo" />
          </div>
          <List className={cx("list-item")}>
            <button className={cx("item", `${(selectedView === "dashboard")&&"selected"}`)} onClick={() => handleViewChange("dashboard")}>
              <ListItemIcon className={cx("icon")}>
                <FaTachometerAlt />
              </ListItemIcon>
              <ListItemText className={cx("text")} primary="Dashboard View" />
            </button>
            <button className={cx("item", `${(selectedView === "gtm-view")&&"selected"}`)} onClick={() => handleViewChange("gtm-view")} >
              <ListItemIcon className={cx("icon")}>
                <FaChartBar />
              </ListItemIcon>
              <ListItemText className={cx("text")} primary="GTM View" />
            </button>
            <button className={cx("item", `${(selectedView === "gtm-config")&&"selected"}`)} onClick={() => handleViewChange("gtm-config")} >
              <ListItemIcon className={cx("icon")}>
                <FaCog />
              </ListItemIcon>
              <ListItemText className={cx("text")} primary="GTM Configuration" />
            </button>
          </List>
    </Box>
  );
};

export default SideBar;