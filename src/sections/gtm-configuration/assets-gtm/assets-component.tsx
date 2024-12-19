import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import styled from "./assets-component.module.scss";
import TypeModal from "../assets-gtm-type/asset-gtm-type-component";
import Ga4 from "../ga4/ga4-component";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  type : string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  icon: React.ReactNode;

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
import { RootState } from "../../../redux/store";
import { setWidthTypeModal } from "../../../redux/assetSlice";
const cx = classnames.bind(styled);
const Section: React.FC<SectionProps> = ({ title, description, icon, onClick, showLink = true, children }) => (
  <div className={cx("section")} onClick={onClick}>
  {title && <div className={cx("section-title")}>{title}</div>} 
  {icon && <div className={cx("icon-container")}>{icon}</div>} 
  {description && <div className={cx("description")}>{description}</div>}
  {children} 
  {showLink && <Link to="https://support.google.com/tagmanager/answer/3281060">Learn more</Link>} 
</div>
);

const AssetsModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  type,
  name,
}) => {
  const dispatch = useDispatch();
  const [isShiftLeft, setIsShiftLeft] = useState(true);
  const [isTagConfigOpen, setIsTagConfigOpen] = useState(false);
  const seclectedTagType = useSelector((state: RootState) => state.tags.selectedTagType);
  const widthTypeModal = useSelector((state: RootState) => state.tags.widthTypeModal);
  

  console.log("name", name);
  console.log("type", type);
  const handleDetail = (typeAsset: string) => {
    setIsTagConfigOpen(true);
    setIsShiftLeft(!isShiftLeft);
    document.body.style.overflow = 'hidden';
    if(typeAsset === "Variable"){
      dispatch(setWidthTypeModal("70%"));
    }
    
  };

  const closeTagConfigModal = () => {
    setIsTagConfigOpen(false);
    setIsShiftLeft(true);
    dispatch(setWidthTypeModal("40%"));
    document.body.style.overflow = 'auto';
  };

  if (!isOpen) 
    return null;
  
  return (
    <>
      {isOpen && <div className={cx("modal-overlay")} onClick={onClose}></div>}
      <div className={cx("modal", { open: isOpen, 'shift-left': isShiftLeft })}>
        <div className={cx("modal-container")}>
          {isTagConfigOpen && (
            <TypeModal
              onClose={closeTagConfigModal}
              isOpen={true}
              name="trigger"
              width={widthTypeModal}
            />
          )}
          <div className={cx("gtm-sheet-header")}>
            <div className={cx("gtm-icon-cancel")}>
              <i
                className={cx("gtm-sheet-header__close")}
                onClick={onClose}
                role="button"
                aria-label="Close the screen"
              >
                &#x2715;
              </i>
              <div className={cx("gtm-flex__section gtm-sheet-header__title")}>
                <div className={cx("gtm-veditor_entity-name")}>
                  <div
                    contentEditable
                    className={cx("contenteditable")}
                    aria-label={`${type ? type : name}`}
                  >
                    {type ? `Untitled ${type}` : name}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("gtm-flex__section--fixed")}>
              <button type="button" className={cx("btn btn-action")} disabled>
                Save
              </button>
              <button type="button" className={cx("btn btn-action")} disabled>
                Save and Push
              </button>
            </div>
          </div>        
            <>
            {seclectedTagType === "Google Analytics" ? (
            <Ga4  /> 
            ) : (
               <Section
                title={type ? `Configuration for ${type}` : name}
                description={type ? `Select the type of ${type} to start setting up...` : "Start setting up..."}
                icon={<FontAwesomeIcon icon={faTags} size="2x" />}
                onClick={() => handleDetail(type)}
                showLink={false} 
              />
            )}
              {type === "Tag" && (
                <Section
                  title="Configuration for Trigger"
                  description="Select the trigger to activate this tag..."
                  icon={<FontAwesomeIcon icon={faLink} size="2x" />}
                  onClick={() => handleDetail("Trigger")}
                  showLink={true} 
                />
              )}
            </>     
        </div>
      </div>
    </>
  );
};

export default AssetsModal;