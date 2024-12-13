import styled from "./header.module.scss";
import classNames from "classnames/bind";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styled);

type SwitchHeaderStyles = {
  id: number;
  title: string;
  path: string;
};

const SwitcheHeader: SwitchHeaderStyles[] = [
  {
    id: 1,
    title: "Report",
    path: "/dashboard",
  },
  {
    id: 2,
    title: "GTM configuration",
    path: "/gtm-configuration",
  },
  {
    id: 3,
    title: "GTM view",
    path: "/gtm-view",
  },
];
const Header = () => {
  const location = useLocation();
  const [viewTitle, setViewTitle] = useState("Report");

  useEffect(() => {
    const handleViewTitle = () => {
      const getTitle = SwitcheHeader.find((item) =>
        location.pathname.includes(item.path)
      );
      if (getTitle) {
        setViewTitle(getTitle.title);
      }
    };
    handleViewTitle();
  }, []);
  return (
    <header>
      <h1>{viewTitle}</h1>
      {viewTitle === "Report" && (
        <div className={cx("download-report")}>
          <DownloadIcon />
          <p>Export file excel</p>
        </div>
      )}
    </header>
  );
};
export default Header;
