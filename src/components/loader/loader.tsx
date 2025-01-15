import styles from "./loader.module.scss";
import classNames from "classnames/bind";
type LoaderProps = {
  width: number;
};
const cx = classNames.bind(styles);
const Loader = (props: LoaderProps) => {
  return (
    <div
      className={cx("loader")}
      style={{
        width: `${props.width}px`,
      }}
    ></div>
  );
};

export default Loader;
