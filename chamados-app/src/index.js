import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';
import AuthProvider from "./contexts/auth";

import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
