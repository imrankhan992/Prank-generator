import React from 'react';
import '../styles/components/Dialog.css';
import close from "../../assets/close.png"
const Dialog = ({ children, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <img src={close} alt="" />
        <button className="dialog-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;