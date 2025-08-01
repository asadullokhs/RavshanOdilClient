import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InfoProvider } from './context/InfoContext';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <InfoProvider>
      <App />
    </InfoProvider>
    </BrowserRouter>
);