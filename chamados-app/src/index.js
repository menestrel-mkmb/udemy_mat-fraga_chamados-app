import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/router';
import AuthProvider from "./contexts/auth";
import CustomerProvider from './contexts/customer';
import TicketsProvider from './contexts/tickets';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <AuthProvider>
      <CustomerProvider>
      <TicketsProvider>
        <AppRoutes />
      </TicketsProvider>
      </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
