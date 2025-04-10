
import React from 'react';
import { Label } from "@/components/ui/label";
import AdvancedEditor from '../../editor/AdvancedEditor';
import { CareerPost } from '../types';
import { Card, CardContent } from "@/components/ui/card";

interface JobDetailsSectionProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost | null>>;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ currentPost, setCurrentPost }) => {
  return (
    <Card className="mt-6 border border-gray-200">
      <CardContent className="p-6">
        <h4 className="font-medium text-[#228977] mb-4">Detailed Job Information</h4>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="description" className="text-base font-medium text-[#21665a]">
              Job Description
            </Label>
            <div className="mt-1.5">
              <AdvancedEditor 
                value={currentPost.description}
                onChange={(value) => setCurrentPost({...currentPost, description: value})}
                placeholder="Describe the job role and responsibilities in detail"
                minHeight="250px"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Provide a comprehensive overview of the position, including day-to-day responsibilities and expectations.
            </p>
          </div>
          
          <div>
            <Label htmlFor="requirements" className="text-base font-medium text-[#21665a]">
              Requirements
            </Label>
            <div className="mt-1.5">
              <AdvancedEditor 
                value={currentPost.requirements}
                onChange={(value) => setCurrentPost({...currentPost, requirements: value})}
                placeholder="List the job requirements (skills, experience, etc.)"
                minHeight="200px"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Specify required skills, experience, and knowledge needed for the position.
            </p>
          </div>
          
          <div>
            <Label htmlFor="qualifications" className="text-base font-medium text-[#21665a]">
              Qualifications
            </Label>
            <div className="mt-1.5">
              <AdvancedEditor 
                value={currentPost.qualifications || ''}
                onChange={(value) => setCurrentPost({...currentPost, qualifications: value})}
                placeholder="List required education, certifications, etc."
                minHeight="200px"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Specify any formal education, certifications, or credentials required for the role.
            </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Highlight the benefits, perks, and advantages of working in this position.
            </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Provide clear instructions on how to apply, what to include, and any deadlines.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetailsSection;
