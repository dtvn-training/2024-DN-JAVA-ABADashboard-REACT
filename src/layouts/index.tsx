import React, { useState } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import classNames from "classnames/bind";
import styles from "./index.module.scss"; // Import CSS module

const cx = classNames.bind(styles);

type PropsStyles = {
  children: React.ReactNode;
};

export const ABADashboardLayout = (props: PropsStyles) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
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
        className={cx("drawer", {
          closed: !isSidebarOpen,
          open: isSidebarOpen,
        })}
      >
        <IconButton onClick={toggleSidebar} className={cx("toggleButton", { centered: !isSidebarOpen })}>
          <MenuIcon />
        </IconButton>
        <SideBar isSidebarOpen={isSidebarOpen} />
      </Drawer>
      <Box
        component="main"
        className={cx("mainContent", { shifted: !isSidebarOpen })}
      >
        <Header />
        <Main>{props.children}</Main>
      </Box>
    </>
  );
};
