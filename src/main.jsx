import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import emailjs from "@emailjs/browser";
emailjs.init("v0cKW4tBmTPXbvdBl"); // 🔴 YOUR PUBLIC KEY

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

