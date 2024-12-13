import styled from "./header.module.scss";
import classNames from "classnames/bind";
import DownloadIcon from '@mui/icons-material/Download';


const cx=classNames.bind(styled);
const Header= ()=>{
    return (
        <header>
            <h1>Report</h1>
            <div className={cx("download-report")}>
                <DownloadIcon />
                <p>Export file excel</p>
            </div>
            
        </header>
    )
}
export default Header;