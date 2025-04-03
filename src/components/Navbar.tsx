
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useScrollEffect } from '@/hooks/use-scroll-effect';
import DesktopMenu from './navigation/DesktopMenu';
import MobileMenu from './navigation/MobileMenu';
import Logo from './Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useScrollEffect(20);

  // Function to handle section scrolling or page navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're on the home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    } else {
      // If on another page, navigate to home with the hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out-quint py-4 px-4 sm:px-6 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-smooth" : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" variant={isScrolled ? "default" : "default"} />
          
          {/* Desktop Menu */}
          <DesktopMenu 
            handleNavigation={handleNavigation} 
            scrollToContact={scrollToContact} 
          />
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-brand-light rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleNavigation={handleNavigation}
        scrollToContact={scrollToContact}
      />
    </header>
  );
};

export default Navbar;
