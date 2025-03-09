
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
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
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          <span>Admin</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-6 border-brand-primary text-brand-primary hover:bg-brand-light"
                      >
                        Read More
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
    </div>
  );
};

export default Blog;
