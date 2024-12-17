import React, { useState } from "react";
import "./CustomModal.scss";
import TagConfigModal from "./TagConfigModal";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  type : String;
  children: React.ReactNode;
  width?: string;
  height?: string;
  //   footerContent?: React.ReactNode;
}

interface SectionProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
  showLink?: boolean; 
  children?: React.ReactNode; 
}

import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faLink } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
const cx = classnames.bind();

const Section: React.FC<SectionProps> = ({ title, description, icon, onClick, showLink = true, children }) => (
  <div className="section" onClick={onClick}>
  {title && <div className="section-title">{title}</div>} 
  {icon && <div className="icon-container">{icon}</div>} 
  {description && <div className="description">{description}</div>}
  {children} {/* Hiển thị children nếu có */}
  {showLink && <Link to="https://support.google.com/tagmanager/answer/3281060">Learn more</Link>} 
</div>
);

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  type,
  name,
  children
  // width = "70%"
}) => {
  const [isShiftLeft, setIsShiftLeft] = useState(true); 
  const [isTagConfigOpen, setIsTagConfigOpen] = useState(false);
  const handleDetail = (value : String) =>{
      setIsTagConfigOpen(true); 
      setIsShiftLeft(!isShiftLeft);
  }

  const closeTagConfigModal = () => {
    setIsTagConfigOpen(false); 
    setIsShiftLeft(true);
  }

  if (!isOpen) return null;
  
  return (
    <>
      {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
      <div className={cx("modal", { open: isOpen, 'shift-left': isShiftLeft, 'shift-left-left': !isShiftLeft })}>
        <div className="modal-container">
          <div className="gtm-sheet-header">
            <div className="gtm-icon-cancel">
              <i
                className="gtm-sheet-header__close"
                onClick={onClose}
                role="button"
                aria-label="Close the screen"
              >
                &#x2715;
              </i>
              <div className="gtm-flex__section gtm-sheet-header__title">
                <div className="gtm-veditor_entity-name">
                  <div
                    contentEditable
                    className="contenteditable"
                    aria-label={`${type ? type : name}`}
                  >
                    {type ? `Untitled ${type}` : name}
                  </div>
                </div>
              </div>
            </div>
            <div className="gtm-flex__section--fixed">
              <button type="button" className="btn btn-action" disabled>
                Save
              </button>
            </div>
          </div>
          <>
          {children ? (
            <Section>{children}</Section>
          ) : (
            <>
               <Section
                title={type ? `Configuration for ${type}` : name}
                description={type ? `Select the type of ${type} to start setting up...` : "Start setting up..."}
                icon={<FontAwesomeIcon icon={faTags} size="2x" />}
                onClick={() => handleDetail(type)}
                showLink={false} 
              />
              {type === "Tag" && (
                <Section
                  title="Configuration for Trigger"
                  description="Select the trigger to activate this tag..."
                  icon={<FontAwesomeIcon icon={faLink} size="2x" />}
                  onClick={() => handleDetail(type)}
                  showLink={true} 
                />
              )}
            </>
          )}
          {isTagConfigOpen && <TagConfigModal  onClose={closeTagConfigModal}  isOpen={true}/>}
          </>
        </div>
      </div>
    </>
  );
};

export default CustomModal;