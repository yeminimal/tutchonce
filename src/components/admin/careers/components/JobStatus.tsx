
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareerPost } from '../types';
import { Badge } from "@/components/ui/badge";

interface JobStatusProps {
  currentPost: CareerPost;
  setCurrentPost: React.Dispatch<React.SetStateAction<CareerPost | null>>;
  isDraft?: boolean;
}

const JobStatus: React.FC<JobStatusProps> = ({ 
  currentPost, 
  setCurrentPost,
  isDraft
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-[#228977]">Listing Status</h4>
          {isDraft && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
              Draft
            </Badge>
          )}
        </div>
        
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
            <p className="text-xs text-muted-foreground mt-1">
              Active listings will appear on your careers page
            </p>
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
  );
};

export default JobStatus;
