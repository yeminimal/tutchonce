
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { BlogPost } from '../types';

interface PostSettingsProps {
  currentPost: BlogPost;
  setCurrentPost: (post: BlogPost) => void;
}

const PostSettings: React.FC<PostSettingsProps> = ({
  currentPost,
  setCurrentPost
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <h4 className="font-medium text-[#228977] mb-4">Post Settings</h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="featuredImage" className="text-sm font-medium text-[#21665a]">
              Featured Image URL
            </Label>
            <Input 
              id="featuredImage"
              value={currentPost.image || ''}
              onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
              placeholder="Enter image URL or upload in content"
              className="mt-1.5 text-sm border-gray-300"
            />
          </div>
          
          <div>
            <Label htmlFor="publishDate" className="text-sm font-medium text-[#21665a]">
              Publish Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                id="publishDate"
                type="date"
                value={currentPost.date}
                onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                className="mt-1.5 pl-10 text-sm border-gray-300"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="author" className="text-sm font-medium text-[#21665a]">
              Author
            </Label>
            <Input 
              id="author"
              value={currentPost.author || 'Admin'}
              onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
              placeholder="Enter author name"
              className="mt-1.5 text-sm border-gray-300"
            />
          </div>
          
          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-[#21665a]">
              Tags (comma separated)
            </Label>
            <Input 
              id="tags"
              value={currentPost.tags?.join(', ') || ''}
              onChange={(e) => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
              placeholder="cleaning, tips, services"
              className="mt-1.5 text-sm border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSettings;
