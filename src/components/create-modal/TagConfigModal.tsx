import React, { useEffect, useState } from 'react';
import './TagConfigModal.scss'; 

const TagConfigModal: React.FC<{ onClose: () => void; isOpen: boolean }> = ({ onClose, isOpen }) => {
  const [tags, setTags] = useState<{ name: string; description: string; enabled: boolean }[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchTags = async () => {
    const response = await new Promise<{ name: string; description: string; enabled: boolean }[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Google Analytics', description: 'Theo dõi lưu lượng truy cập', enabled: true },
          { name: 'Google Ads', description: 'Quảng cáo trực tuyến', enabled: true },
          { name: 'Floodlight', description: 'Theo dõi chuyển đổi', enabled: false },
          // Thêm các thẻ khác ở đây
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
          <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
          <div className="tag-config-modal-container">
            <div className="tag-config-modal active">
              <div className="tag-config-header">
                <h3>Chọn loại biến</h3>
                <button className="close-button" onClick={onClose}>X</button>
              </div>
              <div className="tag-list">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="item-list">
                    {tags.map((template, index) => (
                      <div
                        key={index}
                        className={`item ${!template.enabled ? 'disabled' : ''}`}
                        onClick={() => template.enabled && console.log(`Selected: ${template.name}`)} // Thay thế bằng hàm chọn thẻ
                        role="button"
                      >
                        <div className="item-icon">
                          <i className="gtm-variable-nav-icon-small icon-matting icon-matting--blue"></i>
                        </div>
                        <div className="item-content">
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

export default TagConfigModal;