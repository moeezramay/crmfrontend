import { StrictMode } from 'react'
import React, { createContext, useState, useContext } from 'react';

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const API = "http://18.205.153.235:8000";
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);

createRoot(document.getElementById('root')).render(
  <TokenProvider>
    <App />
  </TokenProvider>
)
