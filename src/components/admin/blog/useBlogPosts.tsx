
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from './types';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);
  
  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };
  
  const handleNewPost = () => {
    setCurrentPost({
      id: Date.now().toString(),
      title: '',
      content: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      author: 'Admin',
      tags: [],
      readingTime: '5 min read',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: ''
    });
    setView('editor');
  };
  
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setView('editor');
  };
  
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
      toast({
        title: "Post Deleted",
        description: "The blog post has been deleted successfully.",
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;
    
    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Post title is required",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate reading time based on content length
    const wordCount = currentPost.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const postToSave = {
      ...currentPost,
      readingTime: `${readingTime} min read`
    };
    
    const updatedPosts = currentPost.id && posts.some(post => post.id === currentPost.id)
      ? posts.map(post => post.id === currentPost.id ? postToSave : post)
      : [...posts, postToSave];
    
    savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');
    
    toast({
      title: "Success",
      description: `Blog post has been ${currentPost.id && posts.some(post => post.id === currentPost.id) ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real application, you'd upload to a server/S3/etc
        // For this demo, we'll use the base64 data
        const result = reader.result as string;
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBackToList = () => {
    if (currentPost && (currentPost.title || currentPost.content)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        setCurrentPost(null);
        setView('list');
      }
    } else {
      setCurrentPost(null);
      setView('list');
    }
  };
  
  return {
    posts,
    currentPost,
    setCurrentPost,
    view,
    searchTerm,
    setSearchTerm,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleSubmit,
    handleImageUpload,
    handleBackToList
  };
};
