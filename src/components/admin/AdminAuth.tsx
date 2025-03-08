
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Lock } from 'lucide-react';

interface AdminAuthProps {
  onLogin: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // For demo purposes, hardcoded password - in production, this should be handled securely
  const ADMIN_PASSWORD = 'tutchonce2024';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminToken', 'admin-authenticated');
        onLogin();
        toast({
          title: "Success",
          description: "You have successfully logged in to the admin dashboard.",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid password. Please try again.",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-8 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center">
          <Lock className="text-brand-primary" size={28} />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-center mb-6">Admin Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <Input 
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-primary hover:bg-brand-secondary text-white"
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminAuth;
