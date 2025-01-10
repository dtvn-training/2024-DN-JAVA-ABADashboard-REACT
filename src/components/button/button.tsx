import styles from "./button.module.scss";
import classNames from "classnames/bind";

type ButtonStyles= {
    fullWidth?: boolean;
    disabled?: boolean;
    backgroundColor: string;
    size?: "small" | "medium" | "large";
    text: string;
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
}
const cx = classNames.bind(styles);
const Button = (props:ButtonStyles) => {
  return (
    <button className={cx("button-submit")} onClick={props.onClick} type={props.type} style={{
        backgroundColor: props.backgroundColor,
        fontSize: props.size === "small"? "14px" : props.size === "medium"? "16px" : "18px",
        width: props.fullWidth? "100%" : "auto",
        cursor: props.disabled? "not-allowed" : "pointer",
        color: props.disabled? "#ccc" : "#000000",
        padding: props.size === "small"? "5px 10px" : props.size === "medium"? "8px 15px" : "15px 20px",
    }}>
        <span>{props.text}</span>
    </button>
  )
}

export default Button;