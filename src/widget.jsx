// src/Widget.jsx
import React, { useState, useEffect } from 'react';
import SmallWidget from './SmallWidget';
import MediumWidget from './MediumWidget';
import FullWidget from './FullWidget';


const Widget = (partnerId) => {
  console.log(partnerId);
  const [connect, setConnect] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (connect) {
      // Initialize WebSocket connection
      const ws = new WebSocket('ws://localhost:5001/twillio-stream');
      setSocket(ws);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        // You can send a message to the server if needed
        ws.send(JSON.stringify({ type: 'INIT', partnerId }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        // Handle incoming messages
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Clean up the WebSocket connection when the component unmounts or widgetState changes
      return () => {
        ws.close();
      };
    }
  }, [connect, partnerId]);


    return (
      <>
        <MediumWidget setConnect={setConnect}/>

      </>
    );
};

export default Widget;