
import { useState, useEffect } from 'react';
import { CareerPost, ViewMode } from './types';
import { toast } from "@/components/ui/use-toast";

const defaultCareerPost: CareerPost = {
  id: '',
  title: '',
  location: '',
  type: 'Full-time',
  description: '',
  requirements: '',
  qualifications: '',
  benefits: '',
  salary: '',
  applicationProcess: '<p>To apply for this position, please send your resume and cover letter to <a href="mailto:careers@tutchonce.com">careers@tutchonce.com</a></p>',
  date: new Date().toISOString().split('T')[0],
  status: 'active'
};

export const useCareerPosts = () => {
  const [posts, setPosts] = useState<CareerPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CareerPost | null>(null);
  const [view, setView] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
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
      ...defaultCareerPost,
      id: Date.now().toString(),
    });
    setView('editor');
  };
  
  const handleEditPost = (post: CareerPost) => {
    setCurrentPost({ ...post });
    setView('editor');
  };
  
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
      toast({
        title: "Job Deleted",
        description: "The job listing has been deleted successfully.",
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;
    
    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Job title is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentPost.location.trim()) {
      toast({
        title: "Error",
        description: "Job location is required",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPosts = currentPost.id && posts.some(post => post.id === currentPost.id)
      ? posts.map(post => post.id === currentPost.id ? currentPost : post)
      : [...posts, currentPost];
    
    savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');
    
    toast({
      title: "Success",
      description: `Job listing has been ${currentPost.id && posts.some(post => post.id === currentPost.id) ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleBackToList = () => {
    if (currentPost && (currentPost.title || currentPost.description)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        setCurrentPost(null);
        setView('list');
      }
    } else {
      setCurrentPost(null);
      setView('list');
    }
  };

  const getFilteredPosts = () => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  return {
    posts,
    filteredPosts: getFilteredPosts(),
    currentPost,
    setCurrentPost,
    view,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleSubmit,
    handleBackToList
  };
};
