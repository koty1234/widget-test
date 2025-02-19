import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './widget';

(function() {
  const container = document.createElement('div');
  container.id = 'my-react-widget';
  document.body.appendChild(container);

  // Attempt to find the current script tag
  const scriptTag = document.currentScript || document.querySelector('script[src*="widget.bundle.js"]');
  const variant = scriptTag ? scriptTag.getAttribute('partnerId') : 'default';

  const root = createRoot(container);
  root.render(<Widget partnerId={variant} />);
})();