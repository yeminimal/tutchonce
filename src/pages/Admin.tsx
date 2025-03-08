
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminAuth from '../components/admin/AdminAuth';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

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
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage blog posts and career listings</p>
          </div>
          
          {isAuthenticated ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <AdminAuth onLogin={() => setIsAuthenticated(true)} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
