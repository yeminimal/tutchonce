
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/components/admin/blog/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
        // Sort by date, newest first
        const sortedPosts = parsedPosts.sort((a: BlogPost, b: BlogPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setBlogPosts([]);
      }
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
            
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <div key={post.id} className="bg-white rounded-2xl shadow-card overflow-hidden animate-reveal card-hover" style={{ transitionDelay: `${200 + index * 100}ms` }}>
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/640x360?text=Tutchonce+Cleaning';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-medium text-brand-primary bg-brand-light px-3 py-1 rounded-full">
                        Blog
                      </span>
                      <h3 className="mt-4 text-xl font-semibold text-brand-primary line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
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
                        onClick={() => openBlogPost(post)}
                      >
                        Read More <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-card">
                <h3 className="text-xl font-semibold text-brand-primary mb-2">No Blog Posts Yet</h3>
                <p className="text-muted-foreground">Check back soon for new articles and cleaning tips!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Blog Post Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-brand-primary">{selectedPost.title}</DialogTitle>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    <User size={14} className="mr-1" /> {selectedPost.author || 'Admin'}
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" /> {new Date(selectedPost.date).toLocaleDateString()}
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" /> {selectedPost.readingTime || '5 min read'}
                  </span>
                </div>
              </DialogHeader>
              
              {selectedPost.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full max-h-[300px] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/1200x600?text=Tutchonce+Cleaning';
                    }}
                  />
                </div>
              )}
              
              <div className="mt-6">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
              
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
