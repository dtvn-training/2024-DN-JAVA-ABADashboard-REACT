import React, { useState } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type PropsStyles = {
  children: React.ReactNode;
};

export const ABADashboardLayout = (props: PropsStyles) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? 240 : 60,
            boxSizing: "border-box",
            backgroundColor: "#EBF7FD",
            color: "white",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            padding: "0px",
            transition: "width 0.3s",
          },
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ alignSelf: 'flex-end', margin: '10px' }}>
          <MenuIcon />
        </IconButton>
        <SideBar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s",
          marginLeft: isSidebarOpen ? -5 : -6,
        }}
      >
        <Header />
        <Main>{props.children}</Main>
      </Box>
    </Box>
  );
};