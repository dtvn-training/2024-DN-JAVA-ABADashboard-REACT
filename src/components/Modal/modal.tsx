import React from 'react';
import classnames from 'classnames/bind';
import styled from './modal.module.scss'; 

const cx = classnames.bind(styled);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    width?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, width, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={cx("modal-overlay")} onClick={onClose}></div>
            <div className={cx("modal-container")} style={{ width }}>
                {children}
            </div>
        </>
    );
};

export default Modal;