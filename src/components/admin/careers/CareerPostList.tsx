
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { CareerPost } from './types';
import { Card, CardContent } from "@/components/ui/card";

interface CareerPostListProps {
  posts: CareerPost[];
  onEdit: (post: CareerPost) => void;
  onDelete: (id: string) => void;
}

const CareerPostList: React.FC<CareerPostListProps> = ({ posts, onEdit, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No job listings yet. Click "New Listing" to create your first job post.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="border border-border">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">{post.title}</h4>
              <p className="text-sm text-muted-foreground">
                {post.location} | {post.type}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                <Edit size={14} className="mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(post.id)}>
                <Trash2 size={14} className="mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CareerPostList;
