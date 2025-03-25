import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './pages/home/Home.jsx'
import Blog from './pages/blog/Blog.jsx';
import BlogDetails from './pages/blog-details/BlogDetails.jsx';
import TermsAndConditions from './pages/terms-conditions/TermsAndConditions.jsx';
import React from 'react';
import About from "./pages/about/About.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactUs from './pages/contact-us/ContactUs.jsx';
function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
   
    <div>
      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </div>
 
  </QueryClientProvider>
  )
}

export default App
