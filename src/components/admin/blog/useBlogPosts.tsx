import { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { supabase } from './supabaseClient';
import { BlogPost } from './types';
import { useToast } from '@/hooks/use-toast';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Fetch posts from Supabase
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('blog_posts').select('*');
      if (error) {
        console.error('Error fetching blog posts:', error.message);
        setPosts([]);
      } else {
        setPosts(data || []);
      }
    };

    fetchPosts();
  }, []);

  const savePosts = async (updatedPosts: BlogPost[]) => {
    const { error } = await supabase.from('blog_posts').upsert(updatedPosts);
    if (error) {
      console.error('Error saving blog posts:', error.message);
    } else {
      setPosts(updatedPosts);
      console.log('Saved blog posts:', updatedPosts);
    }
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
      status: 'draft',
    });
    setView('editor');
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setView('editor');
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      await savePosts(updatedPosts);
      toast({
        title: "Post Deleted",
        description: "The blog post has been deleted successfully.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;

    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Post title is required",
        variant: "destructive",
      });
      return;
    }

    // Calculate reading time based on content length
    const sanitizedContent = sanitizeHtml(currentPost.content, {
      allowedTags: [],
      allowedAttributes: {}
    });
    const wordCount = sanitizedContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

    const postToSave = {
      ...currentPost,
      readingTime: `${readingTime} min read`,
      status: currentPost.status || 'published', // Default to published if not set
    };

    const updatedPosts = currentPost.id && posts.some((post) => post.id === currentPost.id)
      ? posts.map((post) => (post.id === currentPost.id ? postToSave : post))
      : [...posts, postToSave];

    await savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');

    toast({
      title: "Success",
      description: `Blog post has been ${postToSave.status === 'draft' ? 'saved as draft' : 'published'} successfully.`,
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
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
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
    handleBackToList,
  };
};
