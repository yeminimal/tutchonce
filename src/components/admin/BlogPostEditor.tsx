
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image?: string;
}

const BlogPostEditor = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  
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
      image: ''
    });
    setFormVisible(true);
  };
  
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setFormVisible(true);
  };
  
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
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
      description: `Blog post ${currentPost.id ? 'updated' : 'created'} successfully.`,
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Manage Blog Posts</h3>
        <Button onClick={handleNewPost} className="bg-brand-primary hover:bg-brand-secondary text-white">
          <Plus size={16} className="mr-2" />
          New Post
        </Button>
      </div>
      
      {formVisible && currentPost && (
        <div className="bg-brand-light p-6 rounded-xl mb-8">
          <h4 className="text-lg font-medium mb-4">
            {currentPost.id ? 'Edit' : 'Create'} Blog Post
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input 
                id="title"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="Post Title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                Excerpt
              </label>
              <Input 
                id="excerpt"
                value={currentPost.excerpt}
                onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                placeholder="Brief excerpt of the post"
                required
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <Input 
                id="image"
                value={currentPost.image || ''}
                onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                placeholder="Image URL for the post"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <Textarea 
                id="content"
                value={currentPost.content}
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                placeholder="Post content"
                className="min-h-[200px]"
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
                Save Post
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
                  {new Date(post.date).toLocaleDateString()}
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
          No blog posts yet. Click "New Post" to create your first post.
        </div>
      )}
    </div>
  );
};

export default BlogPostEditor;
