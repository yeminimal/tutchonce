
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from 'lucide-react';
import AdvancedEditor from '../editor/AdvancedEditor';
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
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h3 className="text-xl font-semibold text-[#228977] ml-2">
          {isEditing ? 'Edit Job Listing' : 'Create New Job Listing'}
        </h3>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
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
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="space-y-6">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-medium text-[#228977] mb-4">Listing Status</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status" className="text-sm font-medium text-[#21665a]">
                        Status
                      </Label>
                      <Select 
                        value={currentPost.status}
                        onValueChange={(value: 'active' | 'draft' | 'closed') => setCurrentPost({...currentPost, status: value})}
                      >
                        <SelectTrigger className="mt-1.5 border-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="postDate" className="text-sm font-medium text-[#21665a]">
                        Publish Date
                      </Label>
                      <Input 
                        id="postDate"
                        type="date"
                        value={currentPost.date}
                        onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                        className="mt-1.5 border-gray-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#228977] hover:bg-[#21665a] text-white"
                >
                  <Save size={16} className="mr-1.5" />
                  Save Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerPostEditor;
