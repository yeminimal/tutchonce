
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import Bookings from './pages/Bookings';
import { Toaster } from "@/components/ui/toaster"
import './App.css';

const App = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Suspense>
  );
};

export default App;
