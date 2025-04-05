
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, ArrowLeft, Calendar, Clock, Save } from 'lucide-react';
import AdvancedEditor from './editor/AdvancedEditor';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image?: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

const BlogDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (view === 'editor' && currentPost) {
    return (
      <div>
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={handleBackToList}
            className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h3 className="text-xl font-semibold text-[#228977] ml-2">
            {currentPost.id && posts.some(post => post.id === currentPost.id) ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-base font-medium text-[#21665a]">
                        Post Title
                      </Label>
                      <Input 
                        id="title"
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                        placeholder="Enter a compelling title"
                        className="mt-1.5 border-gray-300"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerpt" className="text-base font-medium text-[#21665a]">
                        Excerpt
                      </Label>
                      <Textarea 
                        id="excerpt"
                        value={currentPost.excerpt}
                        onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                        placeholder="Write a brief summary of your post (appears in previews)"
                        className="mt-1.5 border-gray-300 min-h-[80px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content" className="text-base font-medium text-[#21665a]">
                        Post Content
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.content}
                          onChange={(value) => setCurrentPost({...currentPost, content: value})}
                          placeholder="Write your post content here..."
                          minHeight="400px"
                          onImageUpload={handleImageUpload}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-[#228977] mb-4">Post Settings</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="featuredImage" className="text-sm font-medium text-[#21665a]">
                          Featured Image URL
                        </Label>
                        <Input 
                          id="featuredImage"
                          value={currentPost.image || ''}
                          onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                          placeholder="Enter image URL or upload in content"
                          className="mt-1.5 text-sm border-gray-300"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="publishDate" className="text-sm font-medium text-[#21665a]">
                          Publish Date
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input 
                            id="publishDate"
                            type="date"
                            value={currentPost.date}
                            onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                            className="mt-1.5 pl-10 text-sm border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="author" className="text-sm font-medium text-[#21665a]">
                          Author
                        </Label>
                        <Input 
                          id="author"
                          value={currentPost.author || 'Admin'}
                          onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                          placeholder="Enter author name"
                          className="mt-1.5 text-sm border-gray-300"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tags" className="text-sm font-medium text-[#21665a]">
                          Tags (comma separated)
                        </Label>
                        <Input 
                          id="tags"
                          value={currentPost.tags?.join(', ') || ''}
                          onChange={(e) => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                          placeholder="cleaning, tips, services"
                          className="mt-1.5 text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-[#228977] mb-4">SEO Settings</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="seoTitle" className="text-sm font-medium text-[#21665a]">
                          SEO Title
                        </Label>
                        <Input 
                          id="seoTitle"
                          value={currentPost.seoTitle || currentPost.title}
                          onChange={(e) => setCurrentPost({...currentPost, seoTitle: e.target.value})}
                          placeholder="SEO optimized title (if different from post title)"
                          className="mt-1.5 text-sm border-gray-300"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="seoDescription" className="text-sm font-medium text-[#21665a]">
                          Meta Description
                        </Label>
                        <Textarea 
                          id="seoDescription"
                          value={currentPost.seoDescription || currentPost.excerpt}
                          onChange={(e) => setCurrentPost({...currentPost, seoDescription: e.target.value})}
                          placeholder="Meta description for search engines"
                          className="mt-1.5 text-sm border-gray-300 min-h-[80px]"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {(currentPost.seoDescription || currentPost.excerpt || '').length}/160 characters
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="seoKeywords" className="text-sm font-medium text-[#21665a]">
                          Keywords
                        </Label>
                        <Input 
                          id="seoKeywords"
                          value={currentPost.seoKeywords || ''}
                          onChange={(e) => setCurrentPost({...currentPost, seoKeywords: e.target.value})}
                          placeholder="Comma separated keywords"
                          className="mt-1.5 text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBackToList}
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#228977] hover:bg-[#21665a] text-white"
                  >
                    <Save size={16} className="mr-1.5" />
                    Save Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-[#228977]">Blog Management</h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input 
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleNewPost} 
            className="bg-[#228977] hover:bg-[#21665a] text-white"
          >
            <Plus size={16} className="mr-1.5" />
            New Post
          </Button>
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {post.image && (
                    <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=Tutchonce';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <h4 className="font-semibold text-lg text-[#228977] mb-2">{post.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags && post.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-[#f8fffe] text-[#228977] px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readingTime || '5 min read'}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe]" onClick={() => handleEditPost(post)}>
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8fffe] mb-4">
            <Plus size={24} className="text-[#228977]" />
          </div>
          <h3 className="text-xl font-semibold text-[#228977] mb-2">No Blog Posts Yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first blog post</p>
          <Button 
            onClick={handleNewPost} 
            className="bg-[#228977] hover:bg-[#21665a] text-white"
          >
            <Plus size={16} className="mr-1.5" />
            Create Your First Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
