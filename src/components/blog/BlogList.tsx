import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/components/admin/blog/types';

interface BlogListProps {
  blogPosts: BlogPost[];
  onOpenPost: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogPosts, onOpenPost }) => {
  return (
    <div className="container mx-auto px-4">
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onOpenPost={onOpenPost} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-card">
          <h3 className="text-xl font-semibold text-brand-primary mb-2">
            No Blog Posts Yet
          </h3>
          <p className="text-muted-foreground">
            Check back soon for new articles and cleaning tips!
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
