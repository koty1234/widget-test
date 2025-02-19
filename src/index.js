import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './widget';

(function() {
    console.log('Widget bundle loaded');
    // Create a container for the widget
    const container = document.createElement('div');
    container.id = 'my-react-widget';
    document.body.appendChild(container);
    console.log('Container appended', container);
  
    // Render the React widget into the container
    const root = createRoot(container);
    root.render(<Widget />);
    console.log('Widget rendered');
  })();