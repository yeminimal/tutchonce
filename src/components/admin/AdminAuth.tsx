
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // New admin credentials
  const ADMIN_USERNAME = 'admin@tutchonce.com';
  const ADMIN_PASSWORD = 'TutchonceAdmin2025!';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminToken', 'admin-authenticated-' + Date.now());
        toast({
          title: "Success",
          description: "Login successful! Welcome to the admin dashboard.",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fffe] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 rounded-full bg-[#f8fffe] flex items-center justify-center mb-4">
            <Lock className="text-[#228977]" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#228977]">Admin Access</h2>
          <p className="text-[#21665a] mt-2 text-center">Enter your credentials to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-[#21665a]">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="pl-10 border-[#21665a] focus-visible:ring-[#228977]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#21665a]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pl-10 border-[#21665a] focus-visible:ring-[#228977]"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#228977] hover:bg-[#21665a] text-white py-2.5"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Need help accessing your admin account?</p>
            <p>Contact your system administrator</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
