import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure it's 'react-dom/client' in React 18
import App from './App'; // Correct path
import './App.css'; // Correct CSS import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
