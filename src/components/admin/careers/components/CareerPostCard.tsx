
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, MapPin, Briefcase } from 'lucide-react';
import { CareerPost } from '../types';

interface CareerPostCardProps {
  post: CareerPost;
  onEditPost: (post: CareerPost) => void;
  onDeletePost: (id: string) => void;
}

const CareerPostCard: React.FC<CareerPostCardProps> = ({ post, onEditPost, onDeletePost }) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${post.status === 'active' ? 'bg-green-100 text-green-800' : 
                  post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {post.status === 'active' ? 'Active' : 
                 post.status === 'draft' ? 'Draft' : 'Closed'}
              </span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-sm text-gray-500">Posted: {new Date(post.date).toLocaleDateString()}</span>
            </div>
            
            <h4 className="font-semibold text-lg text-[#228977]">{post.title}</h4>
            
            <div className="mt-2 flex items-center text-sm text-gray-600 flex-wrap gap-y-1">
              <div className="flex items-center mr-4">
                <MapPin size={16} className="mr-1 text-gray-400" />
                {post.location}
              </div>
              <div className="flex items-center mr-4">
                <Briefcase size={16} className="mr-1 text-gray-400" />
                {post.type}
              </div>
              {post.salary && (
                <div className="flex items-center">
                  <span className="text-sm">
                    {post.salary}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-[#228977] border-[#228977] hover:bg-[#f8fffe]" 
              onClick={() => onEditPost(post)}
            >
              <Edit size={14} className="mr-1.5" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 border-red-200 hover:bg-red-50" 
              onClick={() => onDeletePost(post.id)}
            >
              <Trash2 size={14} className="mr-1.5" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPostCard;
