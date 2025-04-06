
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CareerPost } from './types';
import CareerEditorHeader from './components/CareerEditorHeader';
import BasicJobInfo from './components/BasicJobInfo';
import JobDetailsSection from './components/JobDetailsSection';
import JobStatus from './components/JobStatus';
import EditorFooter from '../components/EditorFooter';

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
    const updatedPost = { ...currentPost, status: 'draft' };
    setCurrentPost(updatedPost);
    setIsDraft(true);
    
    // Save the draft
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Draft Saved",
      description: "Your job listing has been saved as a draft."
    });
  };
  
  const handlePublish = () => {
    const updatedPost = { ...currentPost, status: 'active' };
    setCurrentPost(updatedPost);
    setIsDraft(false);
    
    // Publish the job
    const event = { preventDefault: () => {} } as React.FormEvent;
    onSubmit(event);
    
    toast({
      title: "Job Listed",
      description: "Your job listing has been published successfully and is now visible on the careers page."
    });
  };
  
  return (
    <div className="pb-10">
      <CareerEditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handlePublish();
      }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h4 className="font-medium text-[#228977] mb-4">Basic Job Information</h4>
                <BasicJobInfo 
                  currentPost={currentPost}
                  setCurrentPost={setCurrentPost}
                />
              </CardContent>
            </Card>
            
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
              
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-medium text-[#228977] mb-4">Actions</h4>
                  <EditorFooter 
                    onBack={onBack} 
                    onSaveDraft={handleSaveDraft}
                    onUpload={handlePublish}
                    contentType="career"
                  />
                </CardContent>
              </Card>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                All job listings are subject to review before being made public.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerPostEditor;
