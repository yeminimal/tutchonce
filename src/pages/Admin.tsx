
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import AdminAuth from '../components/admin/AdminAuth';
import AdminLayout from '../components/admin/AdminLayout';
import BlogDashboard from '../components/admin/BlogDashboard';
import CareerDashboard from '../components/admin/CareerDashboard';
import { trackPageView } from '../utils/analytics';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
      
      // Redirect to dashboard if on the login page
      if (location.pathname === '/admin') {
        navigate('/admin/blog');
      }
    } else {
      // If not authenticated, redirect to login unless already there
      if (location.pathname !== '/admin') {
        navigate('/admin');
      }
    }

    // Track page view
    trackPageView(location.pathname);
    
    // Debug logs
    console.log('Admin page: Auth status =', !!adminToken);
    console.log('Current path:', location.pathname);
  }, [location.pathname, navigate]);

  // Decide which component to render based on the route
  const renderAdminContent = () => {
    if (!isAuthenticated) {
      return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
    }
    
    return (
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/blog" replace />} />
          <Route path="blog" element={<BlogDashboard />} />
          <Route path="careers" element={<CareerDashboard />} />
          <Route path="*" element={<Navigate to="/admin/blog" replace />} />
        </Route>
      </Routes>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fffe]">
      <Helmet>
        <title>Admin Dashboard | Tutchonce Cleaning Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {renderAdminContent()}
    </div>
  );
};

export default Admin;
