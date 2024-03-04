import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';
import AuthProvider from "./contexts/auth";

import Header from './components/Header';
import CustomerProvider from './contexts/customer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <AuthProvider>
      <CustomerProvider>
        <AppRoutes />
      </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
