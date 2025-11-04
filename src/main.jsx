import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import './assets/css/index.css';
import App from './App.jsx';

// Initialize EmailJS
emailjs.init({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
