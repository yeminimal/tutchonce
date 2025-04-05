
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareerPost } from '../types';

interface BasicJobInfoProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost | null>>;
}

const BasicJobInfo: React.FC<BasicJobInfoProps> = ({ currentPost, setCurrentPost }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-base font-medium text-[#21665a]">
            Job Title
          </Label>
          <Input 
            id="title"
            value={currentPost.title}
            onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
            placeholder="e.g. Cleaning Technician"
            className="mt-1.5 border-gray-300"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="type" className="text-base font-medium text-[#21665a]">
            Employment Type
          </Label>
          <Select 
            value={currentPost.type}
            onValueChange={(value) => setCurrentPost({...currentPost, type: value})}
          >
            <SelectTrigger className="mt-1.5 border-gray-300">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location" className="text-base font-medium text-[#21665a]">
            Location
          </Label>
          <Input 
            id="location"
            value={currentPost.location}
            onChange={(e) => setCurrentPost({...currentPost, location: e.target.value})}
            placeholder="e.g. Lagos, Nigeria"
            className="mt-1.5 border-gray-300"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="salary" className="text-base font-medium text-[#21665a]">
            Salary Range (Optional)
          </Label>
          <Input 
            id="salary"
            value={currentPost.salary || ''}
            onChange={(e) => setCurrentPost({...currentPost, salary: e.target.value})}
            placeholder="e.g. ₦150,000 - ₦250,000 per month"
            className="mt-1.5 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicJobInfo;
