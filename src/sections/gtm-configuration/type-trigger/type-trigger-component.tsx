import React from 'react';
import classnames from "classnames/bind";
import styled from "./type-trigger.module.scss"; 
// import { useDispatch } from "react-redux";
// import { setSelectedTriggerType } from "../../../redux/assetSlice"; 

interface TriggerItem {
    name: string;
    description?: string; 
    enabled: boolean; 
}

interface Props {
    items: TriggerItem[]; 
    onClose: () => void; 
}

const cx = classnames.bind(styled);

const TypeTrigger: React.FC<Props> = ({ items, onClose }) => {
    // const dispatch = useDispatch();

    return (
        <div className={cx("item-list")}>
            {items.map((trigger, index) => ( 
                <div
                    key={index}
                    className={cx("item")}
                    onClick={() => {
                        if (trigger.enabled) {
                            // dispatch(setSelectedTriggerType(trigger.name)); 
                            onClose(); 
                        }
                    }}
                    role="button"
                >
                    <input type="checkbox" className={cx("checkbox")} />
                    <div className={cx("item-icon")}></div>
                    <div className={cx("item-content")}>
                        <h3>{trigger.name}</h3>
                        <p>{trigger.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TypeTrigger;