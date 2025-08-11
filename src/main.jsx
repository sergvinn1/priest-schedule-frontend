// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
import './index.css'; // Підключаємо наші глобальні стилі
import { BrowserRouter } from 'react-router-dom'; // Імпортуємо BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Обгортаємо <App /> в BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);