import React from 'react';
import '../styles/components/Panel.css';

const Panel = ({ title, children, width = '100%' }) => {
  return (
    <div className="panel" style={{ maxWidth: width }}>
      {title && (
        <div className="panel-header">
          <h2 className="panel-title">{title}</h2>
        </div>
      )}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
};

export default Panel;