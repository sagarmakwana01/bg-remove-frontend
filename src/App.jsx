import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header.jsx'
import Home from './pages/home/Home.jsx'
import Footer from './components/Footer.jsx'
import Blog from './pages/blog/Blog.jsx';
import BlogDetails from './pages/blog-details/BlogDetails.jsx';
import TermsAndConditions from './pages/terms-conditions/TermsAndConditions.jsx';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div>
      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-detailes" element={<BlogDetails />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </div>
  </Router>
  </QueryClientProvider>
  )
}

export default App
