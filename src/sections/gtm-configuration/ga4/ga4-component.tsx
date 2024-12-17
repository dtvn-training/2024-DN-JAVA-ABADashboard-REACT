import React from 'react'
import classNames from 'classnames/bind';
import styles from './ga4-component.module.scss';

const cx = classNames.bind(styles);
const  Ga4 = () => {
  return (
    <div className={cx("container")}>GA4</div>
  )
}
export default Ga4;