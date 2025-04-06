
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import AdvancedEditor from '../../editor/AdvancedEditor';
import { BlogPost } from '../types';

interface MainContentSectionProps {
  currentPost: BlogPost;
  setCurrentPost: (post: BlogPost) => void;
  handleImageUpload: (file: File) => Promise<string>;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({
  currentPost,
  setCurrentPost,
  handleImageUpload
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-medium text-[#21665a]">
              Post Title
            </Label>
            <Input 
              id="title"
              value={currentPost.title}
              onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
              placeholder="Enter a compelling title"
              className="mt-1.5 border-gray-300"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt" className="text-base font-medium text-[#21665a]">
              Excerpt
            </Label>
            <Textarea 
              id="excerpt"
              value={currentPost.excerpt}
              onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
              placeholder="Write a brief summary of your post (appears in previews)"
              className="mt-1.5 border-gray-300 min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="content" className="text-base font-medium text-[#21665a]">
              Post Content
            </Label>
            <div className="mt-3">
              <AdvancedEditor 
                value={currentPost.content}
                onChange={(value) => setCurrentPost({...currentPost, content: value})}
                placeholder="Write your post content here..."
                minHeight="400px"
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainContentSection;
