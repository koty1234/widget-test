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

const Widget = (partnerId) => {
  console.log(partnerId);
  const [widgetState, setWidgetState] = useState('small');

  // When in the small state, automatically transition to medium after 3 seconds.
  useEffect(() => {
    if (widgetState === 'small') {
      const timer = setTimeout(() => {
        setWidgetState('medium');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [widgetState]);

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
    return <MediumWidget onExpand={handleExpand} onClose={handleClose} />;
  } else if (widgetState === 'full') {
    return <FullWidget onClick={handleFullClick} />;
  }

  return null;
};

export default Widget;