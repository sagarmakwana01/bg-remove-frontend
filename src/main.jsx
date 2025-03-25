import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
<>
<Router>
    <Header />
    <App />
    <Footer />
     </Router>
</>

)
