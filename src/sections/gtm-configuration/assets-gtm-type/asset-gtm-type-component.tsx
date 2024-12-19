import React, { useEffect, useState } from "react";
import styled from "./asset-gtm-type-component.module.scss";
import TypeTag from "../type-tag/type-tag-component";
import classnames from "classnames/bind";

const cx = classnames.bind(styled);

const TypeModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  name: string;
  width: string;
}> = ({ onClose, isOpen, name, width }) => {
  const [loading] = useState<boolean>(true);
  console.log("witdh", width);
  const specificTags = [
    {
      name: "Google Analytics",
      description: "Theo dõi lưu lượng truy cập",
      enabled: true,
    },
    { name: "Google Ads", description: "Quảng cáo trực tuyến", enabled: true },
    { name: "Floodlight", description: "Theo dõi chuyển đổi", enabled: false },
  ];

  const exampleTriggers = [
    { name: 'Page View', description: 'Trigger on page view', enabled: true },
    { name: 'Click', description: 'Trigger on click', enabled: true },
    { name: 'Form Submission', description: 'Trigger on form submission', enabled: false },
  ];

  return (
    <>
      {isOpen && (
        <>
          <div className={cx("modal-overlay-type")} onClick={onClose}></div>
          <div
            className={cx("tag-config-modal-container")}
            style={{ width: width }}
          >
            <div className={cx("tag-config-modal active")}>
              <div className={cx("tag-config-header")}>
                <h3>Chọn loại biến</h3>
                <button className={cx("close-button")} onClick={onClose}>
                  X
                </button>
              </div>
              <div className={cx("tag-list")}>
                <TypeTag items={specificTags} onClose={onClose}/>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TypeModal;
