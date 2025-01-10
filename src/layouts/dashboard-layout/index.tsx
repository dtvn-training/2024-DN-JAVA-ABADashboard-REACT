import React, { useState } from "react";
import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import styled from "styled-components";

const DashboardLayoutWrapper = styled.div`
  padding: 2rem;
`;

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
    <DashboardLayoutWrapper>
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        className={cx("mainContent", { shifted: !isSidebarOpen })}
      >
        <Header />
        <Main>{props.children}</Main>
      </Box>
    </DashboardLayoutWrapper>
  );
};
