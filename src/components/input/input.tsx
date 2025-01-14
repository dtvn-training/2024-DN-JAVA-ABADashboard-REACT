import styles from "./input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type InputProps = {
  placeHolder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  title: string;
  error: boolean | undefined;
  errorMessage: string | undefined;
  children: React.ReactNode | undefined;
};
const Input = (props: InputProps) => {
  return (
    <div className={cx("input-box")}>
      <div className={cx("input")}>
        <label htmlFor={props.id}>{props.title}</label>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        {props.children && <div className={cx("icon")}>{props.children}</div>}
      </div>
      {props.error && props.errorMessage && (
        <span className={cx("error-message")}>{props.errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
