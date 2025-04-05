
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import AdvancedEditor from '../editor/AdvancedEditor';
import { BlogPost } from './types';

interface BlogPostEditorProps {
  currentPost: BlogPost;
  setCurrentPost: (post: BlogPost) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  handleImageUpload: (file: File) => Promise<string>;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  currentPost,
  setCurrentPost,
  onSubmit,
  onBack,
  handleImageUpload
}) => {
  const isEditing = currentPost.id && currentPost.title;
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h3 className="text-xl font-semibold text-[#228977] ml-2">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h3>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
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
                  onClick={onBack}
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
};

export default BlogPostEditor;
