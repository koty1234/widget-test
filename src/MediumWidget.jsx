import React, { useState, useEffect } from 'react';
import BeautifulTextInput from './components/BeautifulTextInput';
import BeautifulButton from './components/BeautifulButton';
import BeautifulTypography from './components/BeautifulTypography';
import ChatComponent from './ChatComponent';
import { FaPhone } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { Button, Stack } from '@mui/material';

const MIN_RADIUS = 100; // collapsed state radius

const MediumWidget = (props) => {
  // Start with the minimized version.
  const [radius, setRadius] = useState(MIN_RADIUS);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const MAX_RADIUS = isExpanded ? (isMobile ? 400 : 600) : MIN_RADIUS;

  // Toggle expansion/collapse when clicking the top header section.
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // When the widget is expanded, wait two seconds then trigger the onExpand prop to switch to full widget.
  useEffect(() => {
    if (isExpanded && props.onExpand) {
      const timer = setTimeout(() => {
        props.onExpand();
      }, 500000); // 2 seconds delay
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or radius changes.
    }
  }, [isExpanded, props.onExpand]);

  const handleSendMessage = (message) => {
    setNewMessage(message);
  };

  // Widget container style including a cool double-line border.
  const widgetContainerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${isExpanded ? MAX_RADIUS * 1 : MIN_RADIUS * 1.5}px`, // Adjust width for non-expanded state
    height: `${MAX_RADIUS}px`,
    fontFamily: 'sans-serif',
    zIndex: 1000,
    borderRadius: `${MAX_RADIUS}px ${MAX_RADIUS}px 0 0`,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.5s ease',
    display: 'flex',
    flexDirection: 'column',
    border: '3px double #007BFF',
    // (Optional) Apply a different background to the entire widget when minimized.
    background: MAX_RADIUS === MIN_RADIUS 
      ? "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')"
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ':hover': {
      width: `${isExpanded ? MAX_RADIUS * 2 : MAX_RADIUS}px`, // Expand to 50% of the fully expanded state on hover
    },
  };

  // Header styles: when the widget is minimized, we use a background image instead of white.
  const headerContainerStyle = {
    background: MAX_RADIUS === MIN_RADIUS 
      ? "none"
      : "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '10px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const headerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '10px',
  };

  // Style for the logo image.
  const logoStyle = {
    width: '80px',
    height: '80px', // Ensure the height is the same as the width
    marginBottom: '5px',
    borderRadius: '50%', // Make the image circular
    overflow: 'hidden', // Ensure the image doesn't overflow the circle
  };

  const bodyContainerStyle = {
    backgroundColor: "fff",
    flex: 1,
  };

  // Footer always sticks to the bottom.
  const footerContainerStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#333',
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

  const buttonSectionStyle = {
    marginBottom: '15px', // Add some space below the buttons
  };

  // Updated content wrapper with extra vertical padding.
  const contentWrapperStyle = {
    paddingLeft: `20px`,
    paddingRight: `20px`,
    paddingBottom: '15px',
    boxSizing: 'border-box',
  };

  return (
    <div style={widgetContainerStyle}>
      {/* Header Section */}
      <div style={headerContainerStyle} onClick={handleToggle}>
        <div style={headerContentStyle}>
          <img src="public/assets/images/headshot.png" alt="Logo" style={logoStyle} />
        </div>
      </div>

      {/* New Button Section using MUI Stack */}
      <Stack direction="row" spacing={2} justifyContent="center" style={buttonSectionStyle}>
        <Button variant="text" startIcon={<FaPhone />} onClick={() => handleSendMessage('Please call me')}>
          Call me
        </Button>
        <Button variant="text" startIcon={<FaMessage />} onClick={() => handleSendMessage('Please text me')}>
          Text me
        </Button>
      </Stack>

      {/* Body Section */}
      <div style={bodyContainerStyle}>
        <div style={contentWrapperStyle}>
          {isExpanded && <ChatComponent newMessage={newMessage} />}
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