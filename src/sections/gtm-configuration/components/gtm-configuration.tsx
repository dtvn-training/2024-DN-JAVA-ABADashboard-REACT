import AddIcon from "@mui/icons-material/Add";
import styled from "./gtm-configuration.module.scss";
import classnames from "classnames/bind";
import { SectionTag } from "./section-tag";
import { SectionVariable } from "./section-variable";
import { SectionTrigger } from "./section-trigger";
import { SectionFolder } from "./section-folder";
import { recentSales } from "../../../utils/_mock-data";
import { useAppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { GetAllTagsAction } from "../../../redux/tag-slice/tag-slice";

const cx = classnames.bind(styled);

type ButtonListStyle = {
  label: string;
  icon: JSX.Element;
};

const buttonList: ButtonListStyle[] = [
  {
    label: "Tag",
    icon: <AddIcon />,
  },
  {
    label: "Trigger",
    icon: <AddIcon />,
  },
  {
    label: "Variable",
    icon: <AddIcon />,
  },
  {
    label: "Folder",
    icon: <AddIcon />,
  },
];

const GtmConfigurationComponent = () => {
  const dispatch= useAppDispatch();
  
  useEffect(()=>{
    dispatch(GetAllTagsAction({
      pageNum: 1,
      pageSize: 5,
    }))
  },[dispatch]);
  return (
    <div className={cx("container")}>
      <div className={cx("section-actions")}>
        {buttonList.map((buttonItem, index) => {
          return (
            <div key={index} className={cx("button")}>
              <span>{buttonItem.label}</span>
              {buttonItem.icon}
            </div>
          );
        })}
      </div>
      <SectionTag />
      <SectionVariable recentSales={recentSales} />
      <SectionTrigger recentSales={recentSales} />
      <SectionFolder />
    </div>
  );
};

export default GtmConfigurationComponent;
