
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: "Success",
      description: "You have successfully logged out.",
    });
    navigate('/admin');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fffe] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#228977]">Admin Dashboard</h1>
            <p className="text-[#21665a] mt-1">Manage your website content</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="text-[#228977] border-[#228977] hover:bg-[#f8fffe] hover:text-[#21665a]"
              onClick={goToHome}
            >
              <Home size={18} className="mr-2" />
              View Site
            </Button>
            <Button 
              variant="outline" 
              className="text-[#228977] border-[#228977] hover:bg-[#f8fffe] hover:text-[#21665a]"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <Card className="shadow-md bg-white border-none rounded-xl">
          <CardContent className="p-6 md:p-8">
            <Tabs defaultValue="blog" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#f8fffe]">
                <TabsTrigger value="blog" className="text-base py-3 data-[state=active]:bg-[#228977] data-[state=active]:text-white">
                  Blog Management
                </TabsTrigger>
                <TabsTrigger value="careers" className="text-base py-3 data-[state=active]:bg-[#228977] data-[state=active]:text-white">
                  Career Listings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="blog">
                {children || <Outlet />}
              </TabsContent>
              
              <TabsContent value="careers">
                {children || <Outlet />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLayout;
