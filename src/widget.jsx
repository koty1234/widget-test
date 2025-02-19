// src/Widget.jsx
import React from 'react';

const widgetStyle = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const expandedWidgetStyle = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  right: '10px',
  bottom: '10px',
  padding: '20px',
  backgroundColor: '#ffffff',
  border: '2px solid #ccc',
  transition: 'all 0.3s ease-in-out',
  zIndex: 1000
};

const Widget = (partnerId) => {
  console.log(partnerId)
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        style={isExpanded ? expandedWidgetStyle : widgetStyle}
        onClick={toggleExpand}
      >
        {isExpanded ? (
          <div>
            <h1>Welcome to the Expanded Widget!</h1>
            <p>Click anywhere to minimize.</p>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Logo" 
              style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px'
              }}
            />
            <p>Learn more</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Widget;