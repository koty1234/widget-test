import React from 'react';

const fullWidgetStyle = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  right: '10px',
  bottom: '10px',
  padding: '20px',
  backgroundColor: '#ffffff',
  border: '2px solid #ccc',
  transition: 'all 0.3s ease-in-out',
  zIndex: 1000,
  overflow: 'auto'
};

const FullWidget = ({ onClick }) => {
  return (
    <div style={fullWidgetStyle} onClick={onClick}>
      <h1>Welcome to the Expanded Widget!</h1>
      <p>Click anywhere to minimize.</p>
    </div>
  );
};

export default FullWidget; 