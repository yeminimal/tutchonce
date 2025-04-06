
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { BlogPost } from '@/components/admin/blog/types';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogDialog from '@/components/blog/BlogDialog';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        console.log('Raw blog posts from storage:', parsedPosts);
        
        // Only show published posts, filter out drafts
        const publishedPosts = parsedPosts.filter((post: BlogPost) => 
          post.status !== 'draft'
        );
        console.log('Published posts after filtering:', publishedPosts);
        
        // Sort by date, newest first
        const sortedPosts = publishedPosts.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setBlogPosts([]);
      }
    } else {
      console.log('No blog posts found in localStorage');
    }
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-reveal');
      elements.forEach(el => observer.observe(el));
    }
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.animate-reveal');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const openBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Tutchonce Cleaning Services</title>
        <meta name="description" content="Read the latest articles about cleaning tips, eco-friendly solutions, and home maintenance from Tutchonce Cleaning Services experts." />
      </Helmet>
      
      <Navbar />
      <main ref={sectionRef}>
        <section className="pt-32 pb-16 px-6">
          <div className="container max-w-6xl mx-auto">
            <BlogHeader />
            <BlogList blogPosts={blogPosts} onOpenPost={openBlogPost} />
          </div>
        </section>
      </main>
      <Footer />
      
      <BlogDialog 
        selectedPost={selectedPost} 
        showDialog={showDialog} 
        setShowDialog={setShowDialog} 
      />
    </div>
  );
};

export default Blog;
