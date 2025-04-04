
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import BlogPostEditor from './BlogPostEditor';
import CareerPostEditor from './careers/CareerPostEditor';
import { Card, CardContent } from "@/components/ui/card";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>
        <Button 
          variant="outline" 
          className="text-muted-foreground hover:text-foreground"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardContent className="p-6 md:p-8">
          <Tabs defaultValue="blog" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="blog" className="text-base py-3">Blog Posts</TabsTrigger>
              <TabsTrigger value="careers" className="text-base py-3">Career Listings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog">
              <BlogPostEditor />
            </TabsContent>
            
            <TabsContent value="careers">
              <CareerPostEditor />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
