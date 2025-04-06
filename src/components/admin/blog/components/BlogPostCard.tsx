
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onEditPost, onDeletePost }) => {
  const dateFormatted = new Date(post.date).toLocaleDateString();
  const timeAgo = formatDistanceToNow(new Date(post.date), { addSuffix: true });
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-[#228977] truncate">{post.title}</h3>
              {post.status === 'draft' && (
                <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
                  Draft
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
              <span className="inline-flex items-center">
                <span className="font-medium">Date:</span>
                <span className="ml-1">{dateFormatted} ({timeAgo})</span>
              </span>
              <span className="inline-flex items-center">
                <span className="font-medium">Author:</span>
                <span className="ml-1">{post.author}</span>
              </span>
              {post.tags && post.tags.length > 0 && (
                <span className="inline-flex items-center">
                  <span className="font-medium">Tags:</span>
                  <span className="ml-1">{post.tags.join(', ')}</span>
                </span>
              )}
            </div>
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

export default BlogPostCard;
