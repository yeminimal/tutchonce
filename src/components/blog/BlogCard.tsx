
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, Clock, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/components/admin/blog/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  onOpenPost: (post: BlogPost) => void;
}

const BlogCard = ({ post, index, onOpenPost }: BlogCardProps) => {
  const getPlaceholderImage = (index: number) => {
    const placeholders = [
      'https://via.placeholder.com/640x360?text=Tutchonce+Cleaning',
      'https://via.placeholder.com/640x360?text=Professional+Services',
      'https://via.placeholder.com/640x360?text=Cleaning+Tips',
    ];
    return placeholders[index % placeholders.length];
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-reveal card-hover" style={{ transitionDelay: `${200 + index * 100}ms` }}>
      <div className="h-48 overflow-hidden">
        {post.image ? (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getPlaceholderImage(index);
            }}
          />
        ) : (
          <img 
            src={getPlaceholderImage(index)} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        )}
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-brand-primary bg-brand-light px-3 py-1 rounded-full">
          Blog
        </span>
        <h3 className="mt-4 text-xl font-semibold text-brand-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
          {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
        </p>
        <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{post.author || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readingTime || '5 min read'}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-6 border-brand-primary text-brand-primary hover:bg-brand-light"
          onClick={() => onOpenPost(post)}
        >
          Read More <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
