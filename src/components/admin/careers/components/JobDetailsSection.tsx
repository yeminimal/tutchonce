
import React from 'react';
import { Label } from "@/components/ui/label";
import AdvancedEditor from '../../editor/AdvancedEditor';
import { CareerPost } from '../types';

interface JobDetailsSectionProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost | null>>;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ currentPost, setCurrentPost }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="description" className="text-base font-medium text-[#21665a]">
          Job Description
        </Label>
        <div className="mt-1.5">
          <AdvancedEditor 
            value={currentPost.description}
            onChange={(value) => setCurrentPost({...currentPost, description: value})}
            placeholder="Describe the job role and responsibilities"
            minHeight="250px"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="requirements" className="text-base font-medium text-[#21665a]">
          Requirements
        </Label>
        <div className="mt-1.5">
          <AdvancedEditor 
            value={currentPost.requirements}
            onChange={(value) => setCurrentPost({...currentPost, requirements: value})}
            placeholder="List the job requirements"
            minHeight="200px"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="qualifications" className="text-base font-medium text-[#21665a]">
          Qualifications
        </Label>
        <div className="mt-1.5">
          <AdvancedEditor 
            value={currentPost.qualifications || ''}
            onChange={(value) => setCurrentPost({...currentPost, qualifications: value})}
            placeholder="List required qualifications, education, certifications, etc."
            minHeight="200px"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="benefits" className="text-base font-medium text-[#21665a]">
          Benefits
        </Label>
        <div className="mt-1.5">
          <AdvancedEditor 
            value={currentPost.benefits || ''}
            onChange={(value) => setCurrentPost({...currentPost, benefits: value})}
            placeholder="List employee benefits, perks, etc."
            minHeight="200px"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="applicationProcess" className="text-base font-medium text-[#21665a]">
          Application Process
        </Label>
        <div className="mt-1.5">
          <AdvancedEditor 
            value={currentPost.applicationProcess || ''}
            onChange={(value) => setCurrentPost({...currentPost, applicationProcess: value})}
            placeholder="Explain how to apply for this position"
            minHeight="150px"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
