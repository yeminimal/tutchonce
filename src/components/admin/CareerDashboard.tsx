
import React from 'react';
import CareerPostList from './careers/CareerPostList';
import CareerPostEditor from './careers/CareerPostEditor';
import { useCareerPosts } from './careers/useCareerPosts';

const CareerDashboard = () => {
  const {
    filteredPosts,
    currentPost,
    setCurrentPost,
    view,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleSubmit,
    handleBackToList
  } = useCareerPosts();
  
  if (view === 'editor' && currentPost) {
    return (
      <CareerPostEditor 
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        onSubmit={handleSubmit}
        onBack={handleBackToList}
      />
    );
  }
  
  return (
    <CareerPostList 
      posts={filteredPosts}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      onNewPost={handleNewPost}
      onEditPost={handleEditPost}
      onDeletePost={handleDeletePost}
    />
  );
};

export default CareerDashboard;
