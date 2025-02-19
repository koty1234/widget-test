// src/Widget.jsx
import React, { useState, useEffect } from 'react';
import SmallWidget from './SmallWidget';
import MediumWidget from './MediumWidget';
import FullWidget from './FullWidget';

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
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out'
};

// Updated medium style: not centered but attached (above) the small widget.
const mediumWidgetStyle = {
  position: 'fixed',
  bottom: '60px',  // appears just above the small widget
  right: '10px',
  width: '400px',
  height: '400px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  border: '2px solid #ccc',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease-in-out',
  zIndex: 1000
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
  zIndex: 1000,
  overflow: 'auto'
};

// New style for the circle X close button
const circleButtonStyle = {
  position: 'fixed',
  bottom: '10px',  // Positioned where the small widget is when medium is open.
  right: '10px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#dc3545', // Use a distinct color (red) for the close button.
  color: '#fff',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001
};

const Widget = (partnerId) => {
  console.log(partnerId);
  const [widgetState, setWidgetState] = useState('small');

  // When in the small state, automatically transition to medium after 3 seconds.
  useEffect(() => {
    let time;
    if (partnerId === '1') {
      time = 3000;
    } else {
      time = 3000;
    }
    if (widgetState === 'small') {
      const timer = setTimeout(() => {
        setWidgetState('medium');
      }, time);
      return () => clearTimeout(timer);
    }
  }, [widgetState, partnerId]);

  // Handlers for each component's click actions
  const handleSmallClick = () => {
    setWidgetState('medium');
  };

  const handleExpand = () => {
    setWidgetState('full');
  };

  const handleClose = () => {
    setWidgetState('small');
  };

  const handleFullClick = () => {
    setWidgetState('small');
  };

  // Render the appropriate widget state.
  if (widgetState === 'small') {
    return <SmallWidget onClick={handleSmallClick} />;
  } else if (widgetState === 'medium') {
    return (
      <>
        <MediumWidget onExpand={handleExpand} onClose={handleClose} />
        {/* Extra circle X button rendered separately */}
        <button
          style={circleButtonStyle}
          onClick={handleClose}
          aria-label="Close Widget"
        >
          &times;
        </button>
      </>
    );
  } else if (widgetState === 'full') {
    return <FullWidget onClick={handleFullClick} />;
  }

  return null;
};

export default Widget;