
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { BlogPost } from './types';

interface BlogPostListProps {
  posts: BlogPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNewPost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({
  posts,
  searchTerm,
  setSearchTerm,
  onNewPost,
  onEditPost,
  onDeletePost
}) => {
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            onClick={onNewPost} 
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
                        <Button variant="ghost" size="sm" className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe]" onClick={() => onEditPost(post)}>
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => onDeletePost(post.id)}>
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
            onClick={onNewPost} 
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

export default BlogPostList;
