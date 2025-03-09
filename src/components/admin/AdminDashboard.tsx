
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import BlogPostEditor from './BlogPostEditor';
import CareerPostEditor from './careers/CareerPostEditor';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <Button 
          variant="outline" 
          className="text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="blog">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="careers">Career Listings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blog">
          <BlogPostEditor />
        </TabsContent>
        
        <TabsContent value="careers">
          <CareerPostEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
