import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <header>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Entrar</Link>
      <Link to="/signup">Cadastrar</Link>
    </header>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
