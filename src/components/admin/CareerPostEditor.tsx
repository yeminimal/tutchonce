
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CareerPost {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  requirements: string;
  date: string;
}

const CareerPostEditor = () => {
  const [posts, setPosts] = useState<CareerPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CareerPost | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  
  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('careerPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);
  
  const savePosts = (updatedPosts: CareerPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('careerPosts', JSON.stringify(updatedPosts));
  };
  
  const handleNewPost = () => {
    setCurrentPost({
      id: Date.now().toString(),
      title: '',
      description: '',
      location: '',
      type: '',
      requirements: '',
      date: new Date().toISOString().split('T')[0]
    });
    setFormVisible(true);
  };
  
  const handleEditPost = (post: CareerPost) => {
    setCurrentPost({ ...post });
    setFormVisible(true);
  };
  
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
      toast({
        title: "Success",
        description: "Job listing deleted successfully.",
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;
    
    const updatedPosts = currentPost.id 
      ? posts.map(post => post.id === currentPost.id ? currentPost : post)
      : [...posts, currentPost];
    
    savePosts(updatedPosts);
    setCurrentPost(null);
    setFormVisible(false);
    
    toast({
      title: "Success",
      description: `Job listing ${currentPost.id ? 'updated' : 'created'} successfully.`,
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Manage Job Listings</h3>
        <Button onClick={handleNewPost} className="bg-brand-primary hover:bg-brand-secondary text-white">
          <Plus size={16} className="mr-2" />
          New Listing
        </Button>
      </div>
      
      {formVisible && currentPost && (
        <div className="bg-brand-light p-6 rounded-xl mb-8">
          <h4 className="text-lg font-medium mb-4">
            {currentPost.id ? 'Edit' : 'Create'} Job Listing
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <Input 
                id="title"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="e.g. Cleaning Technician"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location
                </label>
                <Input 
                  id="location"
                  value={currentPost.location}
                  onChange={(e) => setCurrentPost({...currentPost, location: e.target.value})}
                  placeholder="e.g. Lagos, Nigeria"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium mb-1">
                  Employment Type
                </label>
                <Input 
                  id="type"
                  value={currentPost.type}
                  onChange={(e) => setCurrentPost({...currentPost, type: e.target.value})}
                  placeholder="e.g. Full-time, Part-time"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Job Description
              </label>
              <Textarea 
                id="description"
                value={currentPost.description}
                onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                placeholder="Describe the job role and responsibilities"
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium mb-1">
                Requirements
              </label>
              <Textarea 
                id="requirements"
                value={currentPost.requirements}
                onChange={(e) => setCurrentPost({...currentPost, requirements: e.target.value})}
                placeholder="List the job requirements and qualifications"
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <Button type="button" variant="outline" onClick={() => {
                setFormVisible(false);
                setCurrentPost(null);
              }}>
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-primary hover:bg-brand-secondary text-white">
                Save Listing
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {post.location} | {post.type}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No job listings yet. Click "New Listing" to create your first job post.
        </div>
      )}
    </div>
  );
};

export default CareerPostEditor;
