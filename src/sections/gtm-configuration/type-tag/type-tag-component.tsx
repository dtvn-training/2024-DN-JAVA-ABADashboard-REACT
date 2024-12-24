
import classnames from "classnames/bind";
import styled from "./type-tag.module.scss";
import { setSelectedTagType } from "../../../redux/tag-slice/assetSlice";
import { useDispatch } from "react-redux";

interface Item {
    name: string;
    description?: string; 
    enabled: boolean; 
}

interface Props {
    items: Item[]; 
    onClose: ()=> void;
}

const cx = classnames.bind(styled);

const TypeTag: React.FC<Props> = ({ items ,onClose}) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className={cx("item-list")}>
                {items.map((template, index) => ( 
                    <div
                        key={index}
                        className={cx("item")}
                        onClick={() => {
                            if (template.enabled) {
                                dispatch(setSelectedTagType(template.name));
                                onClose();
                            }
                        }}
                        role="button"
                    >
                        <div className={cx("item-icon")}></div>
                        <div className={cx("item-content")}>
                            <h3>{template.name}</h3>
                            <p dangerouslySetInnerHTML={{ __html: template.description || '' }}></p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TypeTag;