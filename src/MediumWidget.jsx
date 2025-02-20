import React, { useState } from 'react';
import BeautifulTextInput from './components/BeautifulTextInput';
import BeautifulButton from './components/BeautifulButton';
import BeautifulTypography from './components/BeautifulTypography';

const MIN_RADIUS = 125; // collapsed state radius

const MediumWidget = () => {
  // Start with the minimized version.
  const [radius, setRadius] = useState(MIN_RADIUS);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const MAX_RADIUS = isMobile ? 400 : 600;

  // Toggle expansion/collapse when clicking the top header section.
  const handleToggle = (e) => {
    e.stopPropagation();
    if (radius === MIN_RADIUS) {
      setRadius(MAX_RADIUS);
    } else {
      setRadius(MIN_RADIUS);
    }
  };

  // Widget container style including a cool double-line border.
  const widgetContainerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${radius * 2}px`, // widget width is twice the radius
    height: `${radius}px`,
    fontFamily: 'sans-serif',
    zIndex: 1000,
    borderRadius: `${radius}px ${radius}px 0 0`,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.5s ease',
    display: 'flex',
    flexDirection: 'column',
    border: '3px double #007BFF',
    // (Optional) Apply a different background to the entire widget when minimized.
    background: radius === MIN_RADIUS 
      ? "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')" 
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // Header styles: when the widget is minimized, we use a background image instead of white.
  const headerContainerStyle = {
    background: radius === MIN_RADIUS 
      ? "url('/path/to/your/header-bg.jpg')"  // Set your header background image path here.
      : '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '15px',
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
    marginTop: '20px',
    marginBottom: '20px',
  };

  // Style for the logo image.
  const logoStyle = {
    width: '80px',
    marginBottom: '10px',
  };

  const bodyContainerStyle = {
    backgroundColor: '#e7edf2',
    padding: '20px',
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

  const subHeaderStyle = {
    margin: '0 0 20px',
    fontSize: '0.95rem',
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

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  };

  // Updated content wrapper with extra vertical padding.
  const contentWrapperStyle = {
    paddingLeft: `${radius * 0.15}px`,
    paddingRight: `${radius * 0.15}px`,
    paddingTop: '15px',
    paddingBottom: '15px',
    boxSizing: 'border-box',
  };

  return (
    <div style={widgetContainerStyle}>
      {/* Header Section */}
      <div style={headerContainerStyle} onClick={handleToggle}>
        <div style={headerContentStyle}>
          {/* Replace '/logo.png' with your actual logo path */}
          <img src="/logo.png" alt="Logo" style={logoStyle} />
          <BeautifulTypography color="#000" text="24/7 Assistance" variant="h3" />
        </div>
      </div>
      
      {/* Body Section */}
      <div style={bodyContainerStyle}>
        <div style={contentWrapperStyle}>
          <p style={subHeaderStyle}>
            Chat with Sarah, our AI assistant, to book an appointment or ask us a question.
          </p>
          
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="name">Name</label>
            <BeautifulTextInput
              id="name"
              placeholder="Name"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="mobile">Mobile Phone</label>
            <BeautifulTextInput
              id="mobile"
              placeholder="(555) 555-5555"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={inputContainerStyle}>
            <label style={labelStyle} htmlFor="message">Message</label>
            <BeautifulTextInput
              id="message"
              placeholder="How can we help?"
              style={{ width: '100%', padding: '8px' }}
              multiline
            />
          </div>
          
          <p style={disclaimerStyle}>
            By submitting, you authorize Midland Sand to text/call the number above by automated means 
            &amp; AI-generated calls/content. Msg/data rates apply, msg frequency varies. Consent is not 
            a condition of purchase.
          </p>
          
          <div style={buttonContainerStyle}>
            <BeautifulButton title="Send" style={{ marginRight: '10px' }} />
            {/* The expand button has been removed — toggle via header click */}
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