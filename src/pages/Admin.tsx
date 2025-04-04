
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminAuth from '../components/admin/AdminAuth';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useLocation } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }

    // Only force HTTPS in production environments
    if (window.location.hostname !== 'localhost' && 
        !window.location.hostname.includes('preview') && 
        window.location.protocol !== 'https:') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
    
    // Log current location for debugging
    console.log('Current path:', location.pathname);
    console.log('Current hostname:', window.location.hostname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard | Tutchonce Cleaning Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          {isAuthenticated ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6 text-center">Admin Access</h1>
              <AdminAuth onLogin={() => setIsAuthenticated(true)} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
