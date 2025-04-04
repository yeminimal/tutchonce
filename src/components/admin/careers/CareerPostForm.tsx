
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from '../editor/RichTextEditor';
import { Card, CardContent } from "@/components/ui/card";
import { CareerPost } from './types';

interface CareerPostFormProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost>>;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CareerPostForm: React.FC<CareerPostFormProps> = ({
  currentPost,
  setCurrentPost,
  onCancel,
  onSubmit
}) => {
  return (
    <Card className="bg-brand-light mb-8">
      <CardContent className="p-6">
        <h4 className="text-lg font-medium mb-4">
          {currentPost.id ? 'Edit' : 'Create'} Job Listing
        </h4>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Job Title
            </label>
            <Input 
              id="title"
              value={currentPost.title}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              placeholder="e.g. Cleaning Technician"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <Input 
                id="location"
                value={currentPost.location}
                onChange={(e) => setCurrentPost({...currentPost, location: e.target.value})}
                placeholder="e.g. Lagos, Nigeria"
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Employment Type
              </label>
              <Input 
                id="type"
                value={currentPost.type}
                onChange={(e) => setCurrentPost({...currentPost, type: e.target.value})}
                placeholder="e.g. Full-time, Part-time"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Job Description
            </label>
            <RichTextEditor 
              value={currentPost.description}
              onChange={(value) => setCurrentPost({...currentPost, description: value})}
              placeholder="Describe the job role and responsibilities"
              minHeight="150px"
            />
          </div>
          
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-1">
              Requirements
            </label>
            <RichTextEditor 
              value={currentPost.requirements}
              onChange={(value) => setCurrentPost({...currentPost, requirements: value})}
              placeholder="List the job requirements and qualifications"
              minHeight="150px"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-primary hover:bg-brand-secondary text-white">
              Save Listing
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CareerPostForm;
