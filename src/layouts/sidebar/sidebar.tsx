import { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {FaTachometerAlt, FaCog, FaChartBar } from "react-icons/fa";


const SideBar = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const handleViewChange = (view:string) => {
    setSelectedView(view);
  };
  return (
    <Box sx={{ overflow: "auto", mt: 8 }}>
          <List>
            <ListItemButton component="button"  onClick={() => handleViewChange("dashboard")} selected={selectedView === "dashboard"}>
              <ListItemIcon>
                <FaTachometerAlt style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard View" />
            </ListItemButton>
            <ListItemButton component="button" onClick={() => handleViewChange("gtm-view")} selected={selectedView === "gtm-view"}>
              <ListItemIcon>
                <FaChartBar style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="GTM View" />
            </ListItemButton>
            <ListItemButton component="button" onClick={() => handleViewChange("gtm-config")} selected={selectedView === "gtm-config"}>
              <ListItemIcon>
                <FaCog style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="GTM Configuration" />
            </ListItemButton>
          </List>
        </Box>
  );
};

export default SideBar;