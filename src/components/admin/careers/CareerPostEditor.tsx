
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import BasicJobInfo from './components/BasicJobInfo';
import JobDetailsSection from './components/JobDetailsSection';
import JobStatus from './components/JobStatus';
import CareerEditorHeader from './components/CareerEditorHeader';
import EditorFooter from '../components/EditorFooter';
import { CareerPost } from './types';

interface CareerPostEditorProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost | null>>;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const CareerPostEditor: React.FC<CareerPostEditorProps> = ({
  currentPost,
  setCurrentPost,
  onSubmit,
  onBack
}) => {
  const isEditing = !!currentPost.id && currentPost.id !== '';
  const [isDraft, setIsDraft] = useState(currentPost.status === 'draft');
  
  const handleSaveDraft = () => {
    const updatedPost = { ...currentPost, status: 'draft' as const };
    setCurrentPost(updatedPost);
    setIsDraft(true);
    
    // Save the draft
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Draft Saved",
      description: "Your job posting has been saved as a draft."
    });
  };
  
  const handlePublish = () => {
    const updatedPost = { ...currentPost, status: 'active' as const };
    setCurrentPost(updatedPost);
    setIsDraft(false);
    
    // Publish the post
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Job Posting Published",
      description: "Your job posting has been published successfully and is now visible on the careers page."
    });
  };
  
  return (
    <div>
      <CareerEditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePublish();
      }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <BasicJobInfo 
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
            />
            
            <JobDetailsSection 
              currentPost={currentPost}
              setCurrentPost={setCurrentPost}
            />
          </div>
          
          <div>
            <div className="space-y-6">
              <JobStatus 
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
                isDraft={isDraft}
              />
              
              <EditorFooter 
                onBack={onBack} 
                onSaveDraft={handleSaveDraft}
                onUpload={handlePublish}
                contentType="career"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerPostEditor;
