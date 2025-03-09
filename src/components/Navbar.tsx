
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, CalendarCheck } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <Link to="/" className="font-display text-2xl font-semibold text-foreground transition-colors">
            Tutch<span className="text-brand-primary">once</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              onClick={(e) => handleNavigation(e, 'services')}
              className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200"
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavigation(e, 'how-it-works')}
              className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200"
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleNavigation(e, 'testimonials')}
              className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200"
            >
              Testimonials
            </a>
            <Link to="/blog" className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200">
              Blog
            </Link>
            <Link to="/careers" className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200">
              Careers
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => handleNavigation(e, 'contact')}
              className="text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200"
            >
              Contact
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="bg-brand-primary hover:bg-brand-secondary text-white rounded-full px-6 button-hover-effect group"
              onClick={scrollToContact}
            >
              <CalendarCheck className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Book Now
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-brand-light rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-6 px-6 md:hidden animate-fade-in">
          {/* Close button at the top */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-foreground hover:bg-brand-light rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <nav className="flex flex-col space-y-6 mt-8">
            <a 
              href="#services" 
              onClick={(e) => handleNavigation(e, 'services')}
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavigation(e, 'how-it-works')}
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => handleNavigation(e, 'testimonials')}
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
            >
              Testimonials
            </a>
            <Link 
              to="/blog" 
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/careers" 
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => handleNavigation(e, 'contact')}
              className="text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
            >
              Contact
            </a>
          </nav>
          <div className="mt-auto">
            <Button 
              variant="default" 
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white rounded-full button-hover-effect group"
              onClick={scrollToContact}
            >
              <CalendarCheck className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
