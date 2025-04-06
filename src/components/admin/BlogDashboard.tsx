
import React from 'react';
import BlogPostList from './blog/BlogPostList';
import BlogPostEditor from './blog/BlogPostEditor';
import { useBlogPosts } from './blog/useBlogPosts';

const BlogDashboard = () => {
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
    handleImageUpload,
    handleBackToList
  } = useBlogPosts();
  
  if (view === 'editor' && currentPost) {
    return (
      <BlogPostEditor 
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        onSubmit={handleSubmit}
        onBack={handleBackToList}
        handleImageUpload={handleImageUpload}
      />
    );
  }
  
  return (
    <BlogPostList 
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

export default BlogDashboard;
