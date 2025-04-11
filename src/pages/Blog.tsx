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
