
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from './types';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load posts from localStorage with a specific key for blog posts
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        // Validate that we're loading blog posts by checking for required fields
        const validPosts = parsedPosts.filter((post: any) => 
          post.title !== undefined && 
          post.content !== undefined && 
          post.excerpt !== undefined
        );
        setPosts(validPosts);
        console.log('Loaded blog posts:', validPosts);
      } catch (error) {
        console.error('Error parsing blog posts:', error);
        setPosts([]);
      }
    }
  }, []);
  
  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    // Use a distinct key for blog posts storage
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    console.log('Saved blog posts:', updatedPosts);
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
      seoKeywords: '',
      status: 'draft'
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
      readingTime: `${readingTime} min read`,
      status: currentPost.status || 'published' // Default to published if not set
    };
    
    // If the post already exists in the posts array, update it, otherwise add it
    const updatedPosts = currentPost.id && posts.some(post => post.id === currentPost.id)
      ? posts.map(post => post.id === currentPost.id ? postToSave : post)
      : [...posts, postToSave];
    
    savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');
    
    toast({
      title: "Success",
      description: `Blog post has been ${postToSave.status === 'draft' ? 'saved as draft' : 'published'} successfully.`,
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
          console.log("Image uploaded successfully");
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
  
  const getFilteredPosts = () => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'published' && post.status === 'published') || 
                           (statusFilter === 'draft' && post.status === 'draft');
      
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
    handleImageUpload,
    handleBackToList
  };
};
