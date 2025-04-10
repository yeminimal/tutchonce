import React from 'react';
import { BlogPost } from './types';

interface BlogListProps {
  blogPosts: BlogPost[];
  onOpenPost: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogPosts, onOpenPost }) => {
  if (!blogPosts.length) {
    // Display a message for empty state
    return <div>No blog posts available.</div>;
  }

  return (
    <div>
      {blogPosts.map(post => (
        <div key={post.id} onClick={() => onOpenPost(post)}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
