// src/Widget.jsx
import React from 'react';

const widgetStyle = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  padding: '10px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
};

const Widget = () => {
  return (
    <div style={widgetStyle}>
      Hello, I am your React widget!
    </div>
  );
};

export default Widget;