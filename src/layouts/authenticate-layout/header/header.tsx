import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import useRouter from "../../../hooks/useRouter";

const cx = classNames.bind(styles);
const Header = () => {
  const router= useRouter();

  const handleClickBackButton= ()=>{
    router.push("/dashboard");
  }
  return (
    <header className={cx("header-auth")}>
      <div className={cx("back-button")}>
        <FontAwesomeIcon className={cx("icon")} icon={faChevronLeft} />
        <span className={cx("text")} onClick={handleClickBackButton} >Back</span>
      </div>
    </header>
  )
}

export default Header
