import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { BlogPost } from '@/components/admin/blog/types';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import BlogDialog from '@/components/blog/BlogDialog';
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showDialog, setShowDialog] = useState(false);

useEffect(() => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); // Optional: Debugging
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  if (sectionRef.current) {
    const elements = sectionRef.current.querySelectorAll('.animate-reveal');
    elements.forEach(el => observer.observe(el));
  }

  return () => {
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-reveal');
      elements.forEach(el => observer.unobserve(el));
    }
  };
}, []);
