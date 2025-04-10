import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { CareerPost } from '@/components/admin/careers/types';
import CareerHero from '@/components/careers/CareerHero';
import CareerBenefits from '@/components/careers/CareerBenefits';
import JobListings from '@/components/careers/JobListings';
import { supabase } from '@/integrations/supabase/client';

const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<CareerPost[]>([]);

  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll');

    const fetchCareers = async () => {
      const { data, error } = await supabase
        .from('career_posts')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching career posts from Supabase:', error.message);
        setJobs([]);
      } else {
        setJobs(data || []);
      }
    };

    fetchCareers();

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
