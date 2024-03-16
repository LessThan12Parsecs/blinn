import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './style.css'

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);