import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import shopProvider from './context/shopContext';

ReactDOM.render(
  <React.StrictMode>
    <shopProvider>
    <App />
    </shopProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


