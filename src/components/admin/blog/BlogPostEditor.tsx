
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MainContentSection from './components/MainContentSection';
import PostSettings from './components/PostSettings';
import SeoSettings from './components/SeoSettings';
import EditorHeader from './components/EditorHeader';
import EditorFooter from './components/EditorFooter';
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
  
  return (
    <div>
      <EditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={onSubmit} className="space-y-6">
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
              />
              
              <SeoSettings 
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
              />
              
              <EditorFooter onBack={onBack} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPostEditor;
