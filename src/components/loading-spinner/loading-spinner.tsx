import React from 'react';
import styled from './loading-spinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styled);

const LoadingSpinner: React.FC = () => {
  return (
    <div className={cx('loading-spinner')}>
      <div className={cx('spinner')}/>
    </div>
  );
};

export default LoadingSpinner;