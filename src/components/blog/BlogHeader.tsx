
import React from 'react';

const BlogHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
        Our Blog
      </span>
      <h1 className="text-4xl md:text-5xl font-bold animate-reveal text-brand-primary" style={{ transitionDelay: '100ms' }}>
        Cleaning Insights & Tips
      </h1>
      <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
        Stay updated with the latest cleaning trends, tips, and insights from our cleaning experts.
      </p>
    </div>
  );
};

export default BlogHeader;
