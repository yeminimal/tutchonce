
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
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

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Eco-Friendly Cleaning Products You Should Be Using",
      excerpt: "Discover environmentally friendly cleaning solutions that work just as well as traditional products without the harmful chemicals.",
      author: "Jane Doe",
      date: "May 15, 2023",
      readTime: "5 min read",
      image: "public/lovable-uploads/c5442ef4-b436-4d8d-8bc2-c63c107e1d08.png",
      category: "Eco-Friendly"
    },
    {
      id: 2,
      title: "How to Deep Clean Your Kitchen Like a Professional",
      excerpt: "Learn the step-by-step process our professional cleaners use to make kitchens spotless and sanitary.",
      author: "John Smith",
      date: "June 3, 2023",
      readTime: "8 min read",
      image: "public/lovable-uploads/e36c2a0a-ff4e-4be4-bf6c-0366d214a280.png",
      category: "Tips & Tricks"
    },
    {
      id: 3,
      title: "The Ultimate Moving Checklist: Before and After Cleaning",
      excerpt: "Make your move stress-free with our comprehensive cleaning checklist for both your old and new home.",
      author: "Sarah Johnson",
      date: "July 12, 2023",
      readTime: "6 min read",
      image: "public/lovable-uploads/f0d47f10-fab6-41e8-80f1-9e70448d4b9f.png",
      category: "Moving"
    }
  ];

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-card overflow-hidden animate-reveal card-hover" style={{ transitionDelay: `${200 + post.id * 100}ms` }}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-brand-primary bg-brand-light px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-brand-primary line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
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
            
            <div className="mt-16 text-center">
              <Button variant="default" className="bg-brand-primary hover:bg-brand-secondary">
                View All Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
