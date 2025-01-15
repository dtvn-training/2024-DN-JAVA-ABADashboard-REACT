import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/logo.png";
import classNames from "classnames/bind";
import styled from "./sidebar.module.scss";
import useRouter from "../../../hooks/useRouter";
import { useLocation } from "react-router-dom";
import { NavItem } from "../../../utils/_mock-data";
import { FaUser } from "react-icons/fa";
import { useAppSelector } from "../../../redux/store";

const cx = classNames.bind(styled);

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(
    location.pathname.replace("/", "")
  );
  const {isLogined} = useAppSelector(state=>state.authentication);

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    router.push(`/${view}`);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? "260px" : "80px",
          transition: "width 0.3s",
        },
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        className={cx("toggleButton", { centered: !isSidebarOpen })}
      >
        <MenuIcon />
      </IconButton>
      <div className={cx("sidebar")}>
        <Box className={cx("container", `${!isSidebarOpen && "show"}`)}>
          <div className={cx("logo", { hidden: !isSidebarOpen })}>
            <img src={Logo} alt="ABA Logo" />
          </div>
          <List className={cx("list-item")}>
            {NavItem.map((navItem, index) => {
              return (
                <ListItemButton
                  key={index}
                  className={cx(
                    "item",
                    `${selectedView === navItem.linkTo && "selected"}`,
                    `${!isSidebarOpen && "show"}`
                  )}
                  onClick={() => handleViewChange(navItem.linkTo)}
                >
                  <ListItemIcon className={cx("icon")}>
                    <navItem.icon />
                  </ListItemIcon>
                  <ListItemText
                    style={{ display: `${!isSidebarOpen ? "none" : "block"}` }}
                    primary={navItem.text}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <footer className={cx("footer", { hidden: !isSidebarOpen })}>
          <ListItemButton
            className={cx("item")}
            onClick={() => handleViewChange("auth/sign-in")}
          >
            <ListItemIcon className={cx("icon")}>
              <FaUser />
            </ListItemIcon>
            <ListItemText
              style={{ display: `${!isSidebarOpen ? "none" : "block"}` }}
              primary={isLogined? "Sign in": "Logout"}
            />
          </ListItemButton>
          <h3>DTU Intern</h3>
          <p>dtu_intern@gmail.com</p>
        </footer>
      </div>
    </Drawer>
  );
};

export default Sidebar;
