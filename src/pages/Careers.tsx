
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { CareerPost } from '@/components/admin/careers/types';
import CareerHero from '@/components/careers/CareerHero';
import CareerBenefits from '@/components/careers/CareerBenefits';
import JobListings from '@/components/careers/JobListings';

const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<CareerPost[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');
    
    // Load career posts from localStorage with robust error handling
    const fetchJobs = () => {
      try {
        const savedPosts = localStorage.getItem('careerPosts');
        if (!savedPosts) {
          console.log('No career posts found in localStorage');
          setJobs([]);
          return;
        }
        
        const parsedPosts = JSON.parse(savedPosts);
        console.log('Raw career posts from storage:', parsedPosts);
        
        if (!Array.isArray(parsedPosts)) {
          console.error('Parsed career posts is not an array:', parsedPosts);
          setJobs([]);
          return;
        }
        
        // Only show active job listings, filter out drafts and closed positions
        const activeJobs = parsedPosts.filter((job: CareerPost) => 
          job && job.status === 'active'
        );
        console.log('Active jobs after filtering:', activeJobs);
        
        // Sort by date, newest first
        const sortedJobs = activeJobs.sort((a: CareerPost, b: CareerPost) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setJobs(sortedJobs);
      } catch (error) {
        console.error('Error parsing career posts:', error);
        setJobs([]);
      }
    };
    
    fetchJobs();
    
    // Set up animation observer
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
        <CareerHero />
        <CareerBenefits />
        <JobListings jobs={jobs} />
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
