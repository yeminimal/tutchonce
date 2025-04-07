
import React, { useState, useCallback, useEffect } from 'react';
import { Card } from "@/components/ui/card";
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
  
  // Ensure status is properly initialized
  useEffect(() => {
    if (!currentPost.status) {
      setCurrentPost(prev => {
        if (!prev) return null;
        return {...prev, status: 'draft'};
      });
      setIsDraft(true);
    } else {
      setIsDraft(currentPost.status === 'draft');
    }
  }, [currentPost.id, currentPost.status, setCurrentPost]);

  // Memoize update functions to prevent unnecessary re-renders
  const updatePost = useCallback((updatedPost: Partial<CareerPost>) => {
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
      description: "Your job posting has been saved as a draft."
    });
  }, [updatePost, onSubmit]);
  
  const handlePublish = useCallback(() => {
    // Validate required fields
    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Job title is required before publishing",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentPost.location.trim()) {
      toast({
        title: "Error",
        description: "Job location is required before publishing",
        variant: "destructive"
      });
      return;
    }
    
    updatePost({ status: 'active' });
    setIsDraft(false);
    
    // Publish the post
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Job Posting Published",
      description: "Your job posting has been published successfully and is now visible on the careers page."
    });
  }, [currentPost.title, currentPost.location, updatePost, onSubmit]);
  
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
              
              <Card className="border border-gray-200 p-4">
                <EditorFooter 
                  onBack={onBack} 
                  onSaveDraft={handleSaveDraft}
                  onUpload={handlePublish}
                  contentType="career"
                />
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerPostEditor;
