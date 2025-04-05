
import React from 'react';
import { BlogPost } from './types';
import EditorHeader from './components/EditorHeader';
import MainContentSection from './components/MainContentSection';
import PostSettings from './components/PostSettings';
import SeoSettings from './components/SeoSettings';
import EditorFooter from './components/EditorFooter';

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
