import React from 'react';
import '../styles/components/ProgressBar.css';

const ProgressBar = ({ progress, text }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {text && (
        <div className="progress-text">
          {progress}% {text}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;