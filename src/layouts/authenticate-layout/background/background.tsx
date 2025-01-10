import styles from "./background.module.scss";
import classNames from "classnames/bind";
import logo from "../../../assets/logo.png";

const cx= classNames.bind(styles);
const Background = () => {
  return (
    <div className={cx("background")}>
      <img src={logo} alt="logo" />
    </div>
  )
}

export default Background;
