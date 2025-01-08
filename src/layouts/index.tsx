import React, { useState } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box} from "@mui/material";
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
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        className={cx("mainContent", { shifted: !isSidebarOpen })}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Main>{props.children}</Main>
      </Box>
    </>
  );
};
