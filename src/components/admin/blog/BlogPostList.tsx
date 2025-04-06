
import React from 'react';
import { BlogPost } from './types';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import BlogPostCard from './components/BlogPostCard';

interface BlogPostListProps {
  posts: BlogPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onNewPost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({
  posts,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onNewPost,
  onEditPost,
  onDeletePost
}) => {
  return (
    <div>
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onNewPost={onNewPost}
      />
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogPostCard 
              key={post.id}
              post={post}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </div>
      ) : (
        <EmptyState onNewPost={onNewPost} />
      )}
    </div>
  );
};

export default BlogPostList;
