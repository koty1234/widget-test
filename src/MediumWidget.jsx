import React, { useState, useEffect, useRef } from 'react';
import ChatComponent from './ChatComponent';
import { FaPhone } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { Box, Button, Stack } from '@mui/material';
import io from 'socket.io-client';

const MIN_RADIUS = 100; // collapsed state radius

const MediumWidget = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const [conversationId, setConversationId] = useState(null);
  const [token, setToken] = useState(null);
  const [existingMessages, setExistingMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const MAX_RADIUS = isExpanded ? (isMobile ? 400 : 600) : MIN_RADIUS;

  // Initialize socket connection
  useEffect(() => {
    // Only connect when widget is expanded or when props.connect is true
    if (isExpanded) {
      // Check for existing userId in localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }

      // Initialize socket connection with userId if available
      socketRef.current = io('https://hippo-gentle-quagga.ngrok-free.app', {
        auth: {
          token: storedToken || undefined
        },
        transports: ['websocket'],  // Force WebSocket transport
        secure: true,               // Force secure connection
        rejectUnauthorized: false   // Skip certificate validation (use in development only!)
      });

      // Socket event handlers
      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Connection error:', error.message);
        setConnected(false);
      });
      
      // Handle session information
      socketRef.current.on('session', (data) => {
        console.log('Session established:', data);
        // Store userId in localStorage for future connections
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        }
        // Store authentication status if needed
        if (data.isAuthenticated !== undefined) {
          localStorage.setItem('isAuthenticated', data.isAuthenticated);
        }
      });

      socketRef.current.on('mostRecentConversation', (data) => {
        console.log('Most recent conversation:', data);
        setConversationId(data._id);
        setExistingMessages(data.messages || []);
        setMessagesLoaded(true);
      });

      socketRef.current.on('message', (data) => {
        console.log('Received:', data);
        // Store conversation ID for future messages
        if (data.conversationId) {
          setConversationId(data.conversationId);
        }
        setNewMessage({content: data.content, role: 'assistant'});
      });

      socketRef.current.on('error', (data) => {
        console.error('Error:', data.message);
      });

      socketRef.current.on('conversation', (conversation) => {
        // Handle conversation history if needed
        console.log('Received conversation history:', conversation);
      });

      // Cleanup function
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          setConnected(false);
        }
      };
    }
  }, [isExpanded, props.connect, props.token]);

  // Add a timeout to set messagesLoaded to true even if no messages are received
  useEffect(() => {
    if (isExpanded && connected && !messagesLoaded) {
      const timer = setTimeout(() => {
        setMessagesLoaded(true);
      }, 2000); // Wait 2 seconds max for messages
      
      return () => clearTimeout(timer);
    }
  }, [isExpanded, connected, messagesLoaded]);

  // Toggle expansion/collapse when clicking the header.
  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isExpanded) setIsMaximized(false); // reset maximized state when expanding
    setIsExpanded(!isExpanded);
    props.setConnect(true);
  };

  const handleSendMessage = (message) => {
    // Send message via socket if connected
    if (socketRef.current && connected) {
      const messageData = {
        content: message,
        role: 'user' // or any other type you want to use
      };
      
      // Add conversation ID if available for follow-up messages
      if (conversationId) {
        messageData.conversationId = conversationId;
      }
      socketRef.current.emit('message', messageData);
    }
  };

  const handleSendQuickMessage = (message) => {
    // Send message via socket if connected
    if (socketRef.current && connected) {
      const messageData = {
        content: message,
        role: 'user' // or any other type you want to use
      };
      
      // Add conversation ID if available for follow-up messages
      if (conversationId) {
        messageData.conversationId = conversationId;
      }
      socketRef.current.emit('message', messageData);
    }
    setNewMessage({content: message, role: 'user'});
  };

  // Determine widget dimensions and border radius based on state.
  const widgetWidth = isMaximized
    ? '70vw'
    : isExpanded
    ? `${MAX_RADIUS}px`
    : `${MIN_RADIUS * 1.5}px`;
  const widgetHeight = isMaximized ? '85vh' : `${MAX_RADIUS}px`;
  const widgetBorderRadius = isMaximized ? '10px' : `${MAX_RADIUS}px ${MAX_RADIUS}px 0 0`;

  // Dynamic backgrounds based on the widget's state.
  const widgetBackground =
    MAX_RADIUS === MIN_RADIUS
      ? "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')"
      : '#ffffff';

  const headerBackground =
    MAX_RADIUS === MIN_RADIUS
      ? 'none'
      : "url('https://static.vecteezy.com/system/resources/thumbnails/006/849/778/small_2x/abstract-background-with-soft-gradient-color-and-dynamic-shadow-on-background-background-for-wallpaper-eps-10-free-vector.jpg')";

  // Button container style changes based on maximized state.
  const buttonContainerStyle = isMaximized
    ? {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        zIndex: 1001,
      }
    : {
        position: 'absolute',
        top: '45px',
        right: `${MAX_RADIUS * 0.15}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        zIndex: 1001,
      };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'inline-block',
      }}
    >
      {/* Widget Container */}
      <Box
        sx={{
          position: 'relative',
          width: widgetWidth,
          height: widgetHeight,
          fontFamily: 'sans-serif',
          zIndex: 1000,
          borderRadius: widgetBorderRadius,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.5s ease',
          display: 'flex',
          flexDirection: 'column',
          border: '2px double #007BFF',
          background: widgetBackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Only apply hover effect when not expanded
          ...(!isExpanded && {
            '&:hover': {
              transform: 'scale(1.2)',
              border: '3px double #007BFF',
            },
          }),
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: headerBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            p: '5px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleToggle}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '10px',
              mb: '10px',
            }}
          >
            <Box
              component="img"
              src="public/assets/images/headshot.png"
              alt="Logo"
              sx={{
                width: '80px',
                height: '80px',
                mb: '5px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            />
          </Box>
        </Box>

        {/* Button Section */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: '5px' }}>
          <Button variant="text" startIcon={<FaPhone />} onClick={() => handleSendQuickMessage('Please call me')}>
            Call me
          </Button>
          <Button variant="text" startIcon={<FaMessage />} onClick={() => handleSendQuickMessage('Please text me')}>
            Text me
          </Button>
        </Stack>

        {/* Body Section */}
        <Box sx={{ backgroundColor: '#ffffff', flex: 1 }}>
          <Box sx={{ pl: '20px', pr: '20px', pb: '15px', boxSizing: 'border-box' }}>
            {isExpanded && messagesLoaded && 
              <ChatComponent 
                newMessage={newMessage} 
                setIsMaximized={setIsMaximized} 
                isMaximized={isMaximized} 
                sendMessage={handleSendMessage} 
                existingMessages={existingMessages || []}
              />
            }
            {isExpanded && !messagesLoaded && 
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Loading conversation...
              </Box>
            }
          </Box>
        </Box>

        {/* Footer Section */}
        <Box sx={{ backgroundColor: '#fff', p: '10px', textAlign: 'center', fontSize: '0.8rem', color: '#333' }}>
          <Box sx={{ pl: '20px', pr: '20px', pb: '15px', boxSizing: 'border-box' }}>
            Powered by APARA
          </Box>
        </Box>
      </Box>

      {/* Absolute Button Container */}
      {isExpanded && (
        <Box sx={buttonContainerStyle}>
            {isMaximized &&
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#444444',
              color: '#fff',
              fontSize: '1.2rem',
              minWidth: 'unset',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
         _
          </Button>
}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
              setIsMaximized(false);
            }}
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: '#fff',
              fontSize: '1.2rem',
              minWidth: 'unset',
              '&:hover': {
                backgroundColor: '#ff5252',
              },
            }}
          >
            X
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MediumWidget;