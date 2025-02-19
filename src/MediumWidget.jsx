import React, { useState, useRef } from 'react';
import BeautifulTextInput from './components/BeautifulTextInput';
import BeautifulButton from './components/BeautifulButton';
import BeautifulTypography from './components/BeautifulTypography';

const MIN_RADIUS = 150; // collapsed state radius
const SNAP_THRESHOLD = 20; // pixel threshold for the snap gesture

const MediumWidget = ({ onExpand, onClose }) => {
  // `radius` defines the widget's height and half its width to preserve the semi‑circular shape.
  const [radius, setRadius] = useState(225);

  // Determine whether we're on mobile (viewport width <= 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const MAX_RADIUS = isMobile ? 400 : 600;

  // Refs for pointer event state
  const initialPointerY = useRef(0);

  // When the user begins the gesture...
  const handlePointerDown = (e) => {
    e.preventDefault();
    initialPointerY.current = e.clientY;
    // Capture the pointer so we keep receiving events even if the pointer moves away.
    e.target.setPointerCapture(e.pointerId);
  };

  // On gesture end, decide whether to snap open or closed
  const handlePointerUp = (e) => {
    const delta = initialPointerY.current - e.clientY; // Positive means upward swipe.
    if (delta > SNAP_THRESHOLD) {
      // Swipe upward: open widget to maximum size.
      setRadius(MAX_RADIUS);
    } else if (delta < -SNAP_THRESHOLD) {
      // Swipe downward: collapse widget to minimum size.
      setRadius(MIN_RADIUS);
    }
    e.target.releasePointerCapture(e.pointerId);
  };

  // The container's dimensions and borderRadius update smoothly thanks to a CSS transition.
  const widgetContainerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${radius * 2}px`, // widget width is twice the radius
    height: `${radius}px`,
    fontFamily: 'sans-serif',
    zIndex: 1000,
    // Top corners are rounded to create the semi‑circular shape.
    borderRadius: `${radius}px ${radius}px 0 0`,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',  // smooth transitions for resizing
  };

  const headerContainerStyle = {
    backgroundColor: '#007BFF',
    padding: '20px',
    color: '#fff',
    position: 'relative',
  };

  const bodyContainerStyle = {
    backgroundColor: '#e7edf2',
    padding: '20px',
  };

  const footerContainerStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#333',
  };

  const subHeaderStyle = {
    margin: '0 0 20px',
    fontSize: '0.95rem',
    color: '#e0eaff',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
  };

  const inputContainerStyle = {
    marginBottom: '15px',
  };

  const disclaimerStyle = {
    fontSize: '0.75rem',
    color: '#777',
    marginTop: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#fff',
  };

  // Updated handle style: enlarged area with an arrow indicating the action.
  const handleStyle = {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '20px', // increased height to accommodate the arrow icon
    backgroundColor: '#fff',
    borderRadius: '3px',
    cursor: 'ns-resize',
    touchAction: 'none', // prevents native touch scrolling during the gesture
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  };

  // The arrow shows "open" (▲) when collapsed and "minimize" (▼) when expanded.
  const arrowIcon = radius === MIN_RADIUS ? '▲' : '▼';

  // New dynamic content wrapper to inset the content away from the curved edges.
  const contentWrapperStyle = {
    paddingLeft: `${radius * 0.15}px`,
    paddingRight: `${radius * 0.15}px`,
    boxSizing: 'border-box',
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    onExpand();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div style={widgetContainerStyle}>
      {/* Header Section */}
      <div style={headerContainerStyle}>
        <button style={closeButtonStyle} onClick={handleClose} aria-label="Close Widget">
          &times;
        </button>
        <div style={contentWrapperStyle}>
          <BeautifulTypography color="#fff" text="We are here to help 24/7" variant="h3" />
        </div>
        {/* Snap Handle */}
        <div
          style={handleStyle}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <span style={{ fontSize: '14px', color: '#007BFF' }}>{arrowIcon}</span>
        </div>
      </div>
      
      {/* Body Section */}
      <div style={bodyContainerStyle}>
        <div style={contentWrapperStyle}>
          {/* Secondary text moved into the body */}
          <p style={subHeaderStyle}>
            Chat with Sarah, our AI assistant, to book an appointment or ask us a question.
          </p>
          
          {/* Name Input */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="name">Name</label>
            <BeautifulTextInput
              id="name"
              placeholder="Name"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          {/* Mobile Phone Input */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="mobile">Mobile Phone</label>
            <BeautifulTextInput
              id="mobile"
              placeholder="(555) 555-5555"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          {/* Message Input */}
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="message">Message</label>
            <BeautifulTextInput
              id="message"
              placeholder="How can we help?"
              style={{ width: '100%', padding: '8px' }}
              multiline
            />
          </div>
          
          {/* Disclaimer */}
          <p style={disclaimerStyle}>
            By submitting, you authorize Midland Sand to text/call the number above by automated means 
            &amp; AI-generated calls/content. Msg/data rates apply, msg frequency varies. Consent is not 
            a condition of purchase.
          </p>
          
          {/* Buttons */}
          <div style={buttonContainerStyle}>
            <BeautifulButton title="Send" style={{ marginRight: '10px' }} />
            <button onClick={handleExpand}>Expand</button>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div style={footerContainerStyle}>
        <div style={contentWrapperStyle}>
          Powered by APARA
        </div>
      </div>
    </div>
  );
};

export default MediumWidget;