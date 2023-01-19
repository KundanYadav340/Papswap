import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AppProvider } from './Context/appContext';
import { HomeProvider } from './Context/homeContext';
import { ProfileProvider } from './Context/profileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
  <HomeProvider>
  <ProfileProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ProfileProvider>
  </HomeProvider>
  </AppProvider>
);
