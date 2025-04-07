
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import MainContentSection from './components/MainContentSection';
import PostSettings from './components/PostSettings';
import SeoSettings from './components/SeoSettings';
import EditorHeader from './components/EditorHeader';
import EditorFooter from '../components/EditorFooter';
import { BlogPost } from './types';

interface BlogPostEditorProps {
  currentPost: BlogPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<BlogPost | null>>;
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
  const isEditing = !!currentPost.id && currentPost.id !== '';
  const [isDraft, setIsDraft] = useState(currentPost.status === 'draft');
  
  // Ensure status is properly initialized
  useEffect(() => {
    if (!currentPost.status) {
      setCurrentPost({...currentPost, status: 'draft'});
      setIsDraft(true);
    } else {
      setIsDraft(currentPost.status === 'draft');
    }
  }, [currentPost.id, currentPost.status, setCurrentPost]);

  // Memoize update functions to prevent unnecessary re-renders
  const updatePost = useCallback((updatedPost: Partial<BlogPost>) => {
    setCurrentPost(prev => {
      if (!prev) return null;
      return {...prev, ...updatedPost};
    });
  }, [setCurrentPost]);
  
  const handleSaveDraft = useCallback(() => {
    updatePost({ status: 'draft' });
    setIsDraft(true);
    
    // Save the draft
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Draft Saved",
      description: "Your blog post has been saved as a draft."
    });
  }, [updatePost, onSubmit]);
  
  const handlePublish = useCallback(() => {
    // Validate post content before publishing
    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Post title is required before publishing",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentPost.content.trim()) {
      toast({
        title: "Error",
        description: "Post content is required before publishing",
        variant: "destructive"
      });
      return;
    }
    
    updatePost({ status: 'published' });
    setIsDraft(false);
    
    // Publish the post
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Post Published",
      description: "Your blog post has been published successfully and is now visible on the blog page."
    });
  }, [currentPost.title, currentPost.content, updatePost, onSubmit]);
  
  return (
    <div>
      <EditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePublish();
      }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <MainContentSection 
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
              handleImageUpload={handleImageUpload}
            />
          </div>
          
          <div>
            <div className="space-y-6">
              <PostSettings 
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
                isDraft={isDraft}
              />
              
              <SeoSettings 
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
              />
              
              <Card className="border border-gray-200 p-4">
                <EditorFooter 
                  onBack={onBack} 
                  onSaveDraft={handleSaveDraft}
                  onUpload={handlePublish}
                  contentType="blog"
                />
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;
