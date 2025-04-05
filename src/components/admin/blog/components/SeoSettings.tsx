
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from '../types';

interface SeoSettingsProps {
  currentPost: BlogPost;
  setCurrentPost: (post: BlogPost) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({
  currentPost,
  setCurrentPost
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <h4 className="font-medium text-[#228977] mb-4">SEO Settings</h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="seoTitle" className="text-sm font-medium text-[#21665a]">
              SEO Title
            </Label>
            <Input 
              id="seoTitle"
              value={currentPost.seoTitle || currentPost.title}
              onChange={(e) => setCurrentPost({...currentPost, seoTitle: e.target.value})}
              placeholder="SEO optimized title (if different from post title)"
              className="mt-1.5 text-sm border-gray-300"
            />
          </div>
          
          <div>
            <Label htmlFor="seoDescription" className="text-sm font-medium text-[#21665a]">
              Meta Description
            </Label>
            <Textarea 
              id="seoDescription"
              value={currentPost.seoDescription || currentPost.excerpt}
              onChange={(e) => setCurrentPost({...currentPost, seoDescription: e.target.value})}
              placeholder="Meta description for search engines"
              className="mt-1.5 text-sm border-gray-300 min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {(currentPost.seoDescription || currentPost.excerpt || '').length}/160 characters
            </p>
          </div>
          
          <div>
            <Label htmlFor="seoKeywords" className="text-sm font-medium text-[#21665a]">
              Keywords
            </Label>
            <Input 
              id="seoKeywords"
              value={currentPost.seoKeywords || ''}
              onChange={(e) => setCurrentPost({...currentPost, seoKeywords: e.target.value})}
              placeholder="Comma separated keywords"
              className="mt-1.5 text-sm border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
