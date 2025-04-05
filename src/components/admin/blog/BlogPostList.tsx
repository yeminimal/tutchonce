
import React from 'react';
import { BlogPost } from './types';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import BlogPostCard from './components/BlogPostCard';

interface BlogPostListProps {
  posts: BlogPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNewPost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({
  posts,
  searchTerm,
  setSearchTerm,
  onNewPost,
  onEditPost,
  onDeletePost
}) => {
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onNewPost={onNewPost}
      />
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
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
