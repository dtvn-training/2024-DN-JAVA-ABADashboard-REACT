import React, { useEffect, useState } from 'react';
import styled from "./asset-gtm-type-component.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styled);
const TypeModal: React.FC<{ onClose: () => void; isOpen: boolean; onSelectTagType: (type: string) => void  }> = ({ onClose, isOpen ,onSelectTagType}) => {
  const [tags, setTags] = useState<{ name: string; description: string; enabled: boolean }[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchTags = async () => {
    const response = await new Promise<{ name: string; description: string; enabled: boolean }[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Google Analytics', description: 'Theo dõi lưu lượng truy cập', enabled: true },
          { name: 'Google Ads', description: 'Quảng cáo trực tuyến', enabled: true },
          { name: 'Floodlight', description: 'Theo dõi chuyển đổi', enabled: false },

        ]);
      }, 1000); 
    });

    setTags(response);
    setLoading(false); 
  };

  useEffect(() => {
    fetchTags(); 
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div className={cx("modal-overlay-type")} onClick={onClose}></div>
          <div className={cx("tag-config-modal-container")}>
            <div className={cx("tag-config-modal active")}>
              <div className={cx("tag-config-header")}>
                <h3>Chọn loại biến</h3>
                <button className={cx("close-button")} onClick={onClose}>X</button>
              </div>
              <div className={cx("tag-list")}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className={cx("item-list")}>
                    {tags.map((template, index) => (
                      <div
                        key={index}
                        className={cx("item")}
                        onClick={() => {
                          if (template.enabled) {
                            onSelectTagType(template.name); 
                            onClose(); 
                          }
                        }}
                        role="button"
                      >
                        <div className={cx("item-icon")}></div>
                        <div className={cx("item-content")}>
                          <h3>{template.name}</h3>
                          <p dangerouslySetInnerHTML={{ __html: template.description }}></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TypeModal;