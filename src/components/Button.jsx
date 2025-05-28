import React from 'react';
import '../styles/components/Button.css';

const Button = ({ text, onClick, type = 'primary', disabled = false }) => {
  return (
    <button 
      className={`button button-${type} ${disabled ? 'disabled' : ''}`} 
      onClick={onClick}
      disabled={disabled}
    >
     <span> {text}</span>
    </button>
  );
};

export default Button;