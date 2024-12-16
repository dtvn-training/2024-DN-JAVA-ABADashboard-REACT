import "./CreateTagStyles.scss"; // Import SCSS trực tiếp
import React from "react";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faLink} from '@fortawesome/free-solid-svg-icons';

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cx = classnames.bind(); 

const CreateTagModal: React.FC<CreateTagModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
      <div className={cx("modal", { open: isOpen })}>
        <div className="modal-container">
        <div className="gtm-sheet-header">
          <div className="gtm-icon-cancel">
            <i
              className="gtm-sheet-header__close"
              onClick={onClose}
              role="button"
              aria-label="Đóng màn hình"
            >
              &#x2715;
            </i>

            <div className="gtm-flex__section gtm-sheet-header__title">
              <div className="gtm-veditor_entity-name">
                <div
                  contentEditable
                  className="contenteditable"
                  aria-label="Thẻ không có tiêu đề"
                >
                  Thẻ không có tiêu đề
                </div>
              </div>
            </div>
          </div>

            <div className="gtm-flex__section--fixed">
              <button type="button" className="btn btn-action" disabled>
                Lưu
              </button>
            </div>
          </div>
          <div className="section">
            <div className="section-title">Cấu hình thẻ</div>
            <div className="icon-container">
             <FontAwesomeIcon icon={faTags} size="2x"/>
            </div>
            <div className="description">
              Chọn loại thẻ để bắt đầu thiết lập...
            </div>
            <a href="https://support.google.com" className="learn-more">
              Tìm hiểu thêm
            </a>
          </div>

          <div className="section">
            <div className="section-title">Kích hoạt</div>
            <div className="icon-container">
               <FontAwesomeIcon icon={faLink} size="2x" /> 
            </div>
            <div className="description">
              Chọn trình kích hoạt để kích hoạt thẻ này...
            </div>
            <a href="https://support.google.com" className="learn-more">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default CreateTagModal;
