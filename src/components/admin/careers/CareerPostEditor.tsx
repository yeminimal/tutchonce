
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Plus } from 'lucide-react';
import { CareerPost } from './types';
import CareerPostForm from './CareerPostForm';
import CareerPostList from './CareerPostList';

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

  const handleCancelForm = () => {
    setFormVisible(false);
    setCurrentPost(null);
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
        <CareerPostForm 
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          onCancel={handleCancelForm}
          onSubmit={handleSubmit}
        />
      )}
      
      <CareerPostList 
        posts={posts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default CareerPostEditor;
