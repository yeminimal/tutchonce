
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
    <div className="pb-10">
      <CareerEditorHeader isEditing={isEditing} onBack={onBack} />
      
      <form onSubmit={onSubmit} className="space-y-6">
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
              />
              
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-medium text-[#228977] mb-4">Actions</h4>
                  <div className="flex flex-col space-y-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#228977] hover:bg-[#21665a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228977]"
                    >
                      {isEditing ? 'Update Job Listing' : 'Publish Job Listing'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={onBack}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228977]"
                    >
                      Cancel
                    </button>
                  </div>
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
