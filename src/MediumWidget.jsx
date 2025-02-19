import React from 'react';
import BeautifulTextInput from './components/BeautifulTextInput';
import BeautifulButton from './components/BeautifulButton';
import BeautifulTypography from './components/BeautifulTypography';

const widgetContainerStyle = {
  position: 'fixed',
  bottom: '60px',
  right: '10px',
  width: '350px',
  fontFamily: 'sans-serif',
  zIndex: 1000,
  borderRadius: '8px',
  overflow: 'hidden', // keep rounded corners for all sections
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
};

const headerContainerStyle = {
  backgroundColor: '#007BFF', // Nice blue background
  padding: '20px',
  color: '#fff',
  position: 'relative'
};

const bodyContainerStyle = {
  backgroundColor: '#e7edf2', // Main component background
  padding: '20px'
};

const footerContainerStyle = {
  backgroundColor: '#fff', // White background for footer
  padding: '10px',
  textAlign: 'center',
  fontSize: '0.8rem',
  color: '#333'
};

const subHeaderStyle = {
  margin: '0 0 20px',
  fontSize: '0.95rem',
  color: '#e0eaff' // Slightly lighter tone for contrast on blue
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: '600'
};

const inputContainerStyle = {
  marginBottom: '15px'
};

const disclaimerStyle = {
  fontSize: '0.75rem',
  color: '#777',
  marginTop: '10px'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#fff' // Ensure the close button is visible on the blue header
};

const MediumWidget = ({ onExpand, onClose }) => {
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
      {/* Header Section with Blue Background */}
      <div style={headerContainerStyle}>
        <button style={closeButtonStyle} onClick={handleClose} aria-label="Close Widget">
          &times;
        </button>
        <BeautifulTypography color='#fff' text="We are here to help 24/7" variant='h3'/>     
        <p style={subHeaderStyle}>
          Chat with Sarah, our AI assistant, to book an appointment or ask us a question.
        </p>
      </div>
      
      {/* Body Section with #e7edf2 Background */}
      <div style={bodyContainerStyle}>
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
      
      {/* Footer Section with White Background */}
      <div style={footerContainerStyle}>
        Powered by APARA
      </div>
    </div>
  );
};

export default MediumWidget;