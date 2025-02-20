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
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const MAX_RADIUS = isExpanded ? (isMobile ? 400 : 600) : MIN_RADIUS;

  // Toggle expansion/collapse when clicking the header.
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // When the widget is expanded, wait then trigger the onExpand prop.
  useEffect(() => {
    if (isExpanded && props.onExpand) {
      const timer = setTimeout(() => {
        props.onExpand();
      }, 500000); // delay (adjust as needed)
      return () => clearTimeout(timer);
    }
  }, [isExpanded, props.onExpand]);

  const handleSendMessage = (message) => {
    setNewMessage(message);
  };

  // Widget container style remains the same
  const widgetContainerStyle = {
    position: 'relative',
    width: `${isExpanded ? MAX_RADIUS : MIN_RADIUS * 1.5}px`,
    height: `${MAX_RADIUS}px`,
    fontFamily: 'sans-serif',
    zIndex: 1000,
    borderRadius: `${MAX_RADIUS}px ${MAX_RADIUS}px 0 0`,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.5s ease',
    display: 'flex',
    flexDirection: 'column',
    border: '2px double #007BFF',
    background: MAX_RADIUS === MIN_RADIUS 
      ? "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')"
      : "#ffffff",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // Header container style
  const headerContainerStyle = {
    background: MAX_RADIUS === MIN_RADIUS 
      ? "none"
      : "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '5px',
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
    height: '80px',
    marginBottom: '5px',
    borderRadius: '50%',
    overflow: 'hidden',
  };

  // Absolute container for the floating buttons positioned relative to the wrapper.
  const absoluteButtonContainerStyle = {
    position: 'absolute',
    top: '45px',
    right: '85px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    zIndex: 1001,
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  };

  const minimizeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#444444', // Red for minimize
  };

  const bodyContainerStyle = {
    backgroundColor: "#ffffff",
    flex: 1,
  };

  const footerContainerStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#333',
  };

  const buttonSectionStyle = {
    marginTop: '5px',
  };

  const contentWrapperStyle = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '15px',
    boxSizing: 'border-box',
  };

  return (
    // Outer wrapper: relative positioning allows the absolute button container to position relative to this wrapper.
    <div style={{ position: 'fixed',     bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)', display: 'inline-block' }}>
      {/* Widget Container */}
      <div style={widgetContainerStyle}>
        {/* Header Section */}
        <div style={headerContainerStyle} onClick={handleToggle}>
          <div style={headerContentStyle}>
            <img src="public/assets/images/headshot.png" alt="Logo" style={logoStyle} />
          </div>
        </div>

        {/* Button Section using MUI Stack */}
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
      
      {/* Absolute Button Container */}
      {isExpanded && (
        <div style={absoluteButtonContainerStyle}>
          <button 
            style={minimizeButtonStyle} 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default MediumWidget;