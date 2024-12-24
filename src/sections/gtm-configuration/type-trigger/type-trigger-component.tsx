import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames/bind";
import styled from "./type-trigger.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchTypeTriggers, setSelectedTagType } from "../../../redux/tag-slice/assetSlice";
import {TypeTriggerResponse} from "../../../services/gtm-configuration/get-type-trigger";

interface Props {
    onClose: () => void;
}

const cx = classnames.bind(styled);

const TypeTrigger: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const { triggers } = useAppSelector((state) => state.asset);
    const [currPage, setCurrPage] = useState(1); 
    const [prevPage, setPrevPage] = useState(0);
    const [wasLastList, setWasLastList] = useState(false);
    const [listTrigger, setListTrigger] = useState<TypeTriggerResponse[]>([]);
    const listInnerRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage((prev) => prev + 1);
            }
        }
    };

    useEffect(()=>{
        console.log(triggers?.data);
        console.log("trang hiện tại ", currPage);
        setCurrPage((prev) => prev + 1);
        console.log(triggers?.totalPages);
    },[triggers])

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchTypeTriggers({ page: currPage, size: 5 }));
            if (!triggers?.data?.length) {
                setWasLastList(true);   
                return;
            }
            setPrevPage(currPage);
            setListTrigger(triggers?.data);
        };
        if (!wasLastList && prevPage !== currPage) {
            fetchData();
        }
    }, [currPage, wasLastList, prevPage, triggers]);

    return (
        <div
            className={cx("item-list")}
            onScroll={onScroll}
            ref={listInnerRef} // Attach the ref here
        >
            {listTrigger.map((trigger, index) => (
                <div
                    key={index}
                    className={cx("item")}
                    onClick={() => {
                        dispatch(setSelectedTagType(trigger.displayName));
                        onClose();
                    }}
                    role="button"
                >
                    <input type="checkbox" className={cx("checkbox")} />
                    <div className={cx("item-icon")}></div>
                    <div className={cx("item-content")}>
                        <h3>{trigger.displayName}</h3>
                    </div>
                </div>
            )) ?? null}
        </div>
    );
};

export default TypeTrigger;
