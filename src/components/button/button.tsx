import styles from "./button.module.scss";
import classNames from "classnames/bind";

type ButtonProps = {
  fullWidth?: boolean;
  disabled?: boolean;
  backgroundColor: string;
  size: "small" | "medium" | "large";
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};
const sizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
};
const paddingMap = {
  small: "5px 10px",
  medium: "8px 15px",
  large: "15px 20px",
};
const cx = classNames.bind(styles);
const Button = (props: ButtonProps) => {
  return (
    <button
      className={cx("button-submit")}
      onClick={props.onClick}
      type={props.type}
      style={{
        backgroundColor: props.backgroundColor,
        fontSize: sizeMap[props.size],
        width: props.fullWidth ? "100%" : "auto",
        cursor: props.disabled ? "not-allowed" : "pointer",
        color: props.disabled ? "#ccc" : "#000000",
        padding: paddingMap[props.size],
      }}
    >
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
