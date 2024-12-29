import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FaTachometerAlt, FaCog, FaChartBar } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import classNames from "classnames/bind";
import styled from "./sidebar.module.scss";
import useRouter from "../../hooks/useRouter";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styled);

const SideBar = () => {
  const router= useRouter();
  const location= useLocation();
  const [selectedView, setSelectedView] = useState(location.pathname.replace("/", ""));
  const handleViewChange = (view: string) => {
    setSelectedView(view);
    router.push(`/${view}`);
  };

  return (
    <div className={cx("sidebar")}>
      <Box className={cx("container")}>
        <div className={cx("logo")}>
          <img src={Logo} alt="ABA Logo" />
        </div>
        <List className={cx("list-item")}>
          <ListItemButton 
            className={cx(
              "item",
              `${selectedView === "dashboard" && "selected"}`
            )}
            onClick={() => handleViewChange("dashboard")}
          >
            <ListItemIcon className={cx("icon")}>
              <FaTachometerAlt />
            </ListItemIcon>
            <ListItemText primary="Dashboard View" />
          </ListItemButton>
          <ListItemButton 
            className={cx(
              "item",
              `${selectedView === "gtm-view" && "selected"}`
            )}
            onClick={() => handleViewChange("gtm-view")}
          >
            <ListItemIcon className={cx("icon")}>
              <FaChartBar />
            </ListItemIcon>
            <ListItemText primary="GTM View" />
          </ListItemButton>
          <ListItemButton 
            className={cx(
              "item",
              `${selectedView === "gtm-config" && "selected"}`
            )}
            onClick={() => handleViewChange("gtm-config")}
          >
            <ListItemIcon className={cx("icon")}>
              <FaCog />
            </ListItemIcon>
            <ListItemText primary="GTM Configuration" />
          </ListItemButton>
        </List>
      </Box>
      <footer className={cx("footer")}>
        <h3>DTU Intern</h3>
        <p>dtu_intern@gmail.com</p>
      </footer>
    </div>
  );
};

export default SideBar;