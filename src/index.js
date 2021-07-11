import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShopProvider from './context/shopContext';

ReactDOM.render(
  <React.StrictMode>
    <ShopProvider>
    <App />
    </ShopProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


