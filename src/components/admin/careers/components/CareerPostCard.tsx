
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, MapPin, Briefcase, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CareerPost } from '../types';

interface CareerPostCardProps {
  post: CareerPost;
  onEditPost: (post: CareerPost) => void;
  onDeletePost: (id: string) => void;
}

const CareerPostCard: React.FC<CareerPostCardProps> = ({ post, onEditPost, onDeletePost }) => {
  const dateFormatted = new Date(post.date).toLocaleDateString();
  const timeAgo = formatDistanceToNow(new Date(post.date), { addSuffix: true });
  
  // Determine status badge properties
  const getBadgeStyles = () => {
    switch (post.status) {
      case 'active':
        return "bg-green-50 text-green-700 border-green-300";
      case 'draft':
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      case 'closed':
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-blue-50 text-blue-700 border-blue-300";
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-[#228977] truncate">{post.title}</h3>
              <Badge variant="outline" className={`ml-2 ${getBadgeStyles()}`}>
                {post.status === 'active' ? 'Active' : post.status === 'draft' ? 'Draft' : 'Closed'}
              </Badge>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-sm text-muted-foreground flex items-center">
                <MapPin size={14} className="mr-1" /> {post.location}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Briefcase size={14} className="mr-1" /> {post.type}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <CalendarDays size={14} className="mr-1" /> {dateFormatted} ({timeAgo})
              </span>
            </div>
            
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {post.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 self-end md:self-center">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => onEditPost(post)}
            >
              <Edit2 size={16} className="mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onDeletePost(post.id)}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerPostCard;
