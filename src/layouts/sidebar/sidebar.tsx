import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Drawer, IconButton } from "@mui/material";
import { FaTachometerAlt, FaCog, FaChartBar } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../../assets/logo.png";
import classNames from "classnames/bind";
import styled from "./sidebar.module.scss";
import useRouter from "../../hooks/useRouter";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styled);

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(location.pathname.replace("/", ""));
  const handleViewChange = (view: string) => {
    setSelectedView(view);
    router.push(`/${view}`);
  };

  return (
    <Drawer
    variant="permanent"
    sx={{
      '& .MuiDrawer-paper': {
        width: isSidebarOpen ? '260px' : '80px',
        transition: 'width 0.3s',
      },
    }}
  >
      <IconButton onClick={toggleSidebar} className={cx("toggleButton", { centered: !isSidebarOpen })}>
        <MenuIcon />
      </IconButton>
      <div className={cx("sidebar")}>
        <Box className={cx("container")}>
          <div className={cx("logo", { hidden: !isSidebarOpen })}>
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
        <footer className={cx("footer", { hidden: !isSidebarOpen })}>
          <h3>DTU Intern</h3>
          <p>dtu_intern@gmail.com</p>
        </footer>
      </div>
    </Drawer>
  );
};

export default Sidebar;
