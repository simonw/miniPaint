/**
 * miniPaint - React Version
 * https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// Import CSS (same as original)
import './../css/reset.css';
import './../css/utility.css';
import './../css/component.css';
import './../css/layout.css';
import './../css/menu.css';
import './../css/print.css';
import './../../node_modules/alertifyjs/build/css/alertify.min.css';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
});
