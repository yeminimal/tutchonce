
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';

const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
    // Load career posts from localStorage
    const savedPosts = localStorage.getItem('careerPosts');
    if (savedPosts) {
      setJobs(JSON.parse(savedPosts));
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
        <title>Careers | Tutchonce Cleaning Services</title>
        <meta name="description" content="Join the Tutchonce Cleaning Services team. View open positions and apply today for a rewarding career in the cleaning industry." />
      </Helmet>
      
      <Navbar />
      <main ref={sectionRef}>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-brand-light">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-white text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
                Join Our Team
              </span>
              <h1 className="text-4xl md:text-5xl font-bold animate-reveal text-brand-primary" style={{ transitionDelay: '100ms' }}>
                Build Your Career With Us
              </h1>
              <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
                We're looking for talented individuals to join our growing team and help deliver exceptional cleaning services across Nigeria.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16 px-6">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-primary text-center mb-12 animate-reveal">
              Why Join Tutchonce?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '100ms' }}>
                <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
                  <Briefcase className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-primary mb-3">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  We invest in our team members' professional development with training programs and clear career advancement paths.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '200ms' }}>
                <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
                  <Clock className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-primary mb-3">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  We understand the importance of balance and offer flexible scheduling options for many positions.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '300ms' }}>
                <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
                  <MapPin className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-primary mb-3">Nationwide Opportunities</h3>
                <p className="text-muted-foreground">
                  With operations across Nigeria, we offer positions in multiple locations to suit your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-primary text-center mb-12 animate-reveal">
              Open Positions
            </h2>
            
            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl shadow-card animate-reveal">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-brand-primary">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            <MapPin size={16} className="mr-1" /> {job.location}
                          </span>
                          <span className="inline-flex items-center text-sm text-muted-foreground">
                            <Clock size={16} className="mr-1" /> {job.type}
                          </span>
                        </div>
                        <p className="mt-4 text-muted-foreground">{job.description}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-brand-primary mb-2">Requirements:</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {job.requirements}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        className="mt-6 md:mt-0 bg-brand-primary hover:bg-brand-secondary group"
                      >
                        Apply Now
                        <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-card">
                <h3 className="text-xl font-semibold text-brand-primary mb-2">No Open Positions</h3>
                <p className="text-muted-foreground">We don't have any openings at the moment. Please check back later!</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6 animate-reveal">
                Don't see a position that matches your skills? We're always looking for talented individuals to join our team.
              </p>
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light">
                Send Speculative Application
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
