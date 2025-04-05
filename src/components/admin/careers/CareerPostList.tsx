
import React from 'react';
import { CareerPost } from './types';
import CareerSearchBar from './components/CareerSearchBar';
import CareerEmptyState from './components/CareerEmptyState';
import CareerPostCard from './components/CareerPostCard';

interface CareerPostListProps {
  posts: CareerPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onNewPost: () => void;
  onEditPost: (post: CareerPost) => void;
  onDeletePost: (id: string) => void;
}

const CareerPostList: React.FC<CareerPostListProps> = ({
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
      <CareerSearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onNewPost={onNewPost}
      />
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <CareerPostCard 
              key={post.id}
              post={post}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </div>
      ) : (
        <CareerEmptyState onNewPost={onNewPost} />
      )}
    </div>
  );
};

export default CareerPostList;
