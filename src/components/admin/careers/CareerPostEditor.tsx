
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CareerPost } from './types';
import CareerEditorHeader from './components/CareerEditorHeader';
import BasicJobInfo from './components/BasicJobInfo';
import JobDetailsSection from './components/JobDetailsSection';
import JobStatus from './components/JobStatus';
import EditorFooter from '../blog/components/EditorFooter';

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
  
  return (
    <div>
      <CareerEditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <BasicJobInfo 
                  currentPost={currentPost}
                  setCurrentPost={setCurrentPost}
                />
                
                <JobDetailsSection 
                  currentPost={currentPost}
                  setCurrentPost={setCurrentPost}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="space-y-6">
              <JobStatus 
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

export default CareerPostEditor;
