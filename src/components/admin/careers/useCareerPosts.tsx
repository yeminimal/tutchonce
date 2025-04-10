import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { CareerPost } from './types';
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
  status: 'draft',
};

export const useCareerPosts = () => {
  const [posts, setPosts] = useState<CareerPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CareerPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Fetch posts from Supabase
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('career_posts').select('*');
      if (error) {
        console.error('Error fetching career posts:', error.message);
        setPosts([]);
      } else {
        setPosts(data || []);
      }
    };

    fetchPosts();
  }, []);

  const savePosts = async (updatedPosts: CareerPost[]) => {
    const { error } = await supabase.from('career_posts').upsert(updatedPosts);
    if (error) {
      console.error('Error saving career posts:', error.message);
    } else {
      setPosts(updatedPosts);
    }
  };

  const handleNewPost = () => {
    setCurrentPost({ ...defaultCareerPost, id: Date.now().toString() });
    setView('editor');
  };

  const handleEditPost = (post: CareerPost) => {
    setCurrentPost({ ...post });
    setView('editor');
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      await savePosts(updatedPosts);
      toast({
        title: "Job Deleted",
        description: "The job listing has been deleted successfully.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;

    if (!currentPost.title.trim() || !currentPost.location.trim()) {
      toast({
        title: "Error",
        description: "Job title and location are required",
        variant: "destructive",
      });
      return;
    }

    const updatedPosts = currentPost.id && posts.some((post) => post.id === currentPost.id)
      ? posts.map((post) => (post.id === currentPost.id ? currentPost : post))
      : [...posts, currentPost];

    await savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');

    toast({
      title: "Success",
      description: `Job listing has been ${currentPost.status === 'draft' ? 'saved as draft' : 'published'} successfully.`,
    });
  };

  const getFilteredPosts = () => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || post.status === statusFilter;

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
  };
};
