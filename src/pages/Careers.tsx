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

const revealElements = () => {
    const elements = sectionRef.current?.querySelectorAll('.animate-reveal') || [];

    elements.forEach((el, i) => {
// Delay each reveal for staggered animation effect
      setTimeout(() => {
        el.classList.add('in-view');
      }, i * 100);
    });
  };

// Run after DOM updates (especially after Supabase data loads)
  setTimeout(revealElements, 300);

  return () => {
    document.documentElement.classList.remove('smooth-scroll');
  };
}, []);
