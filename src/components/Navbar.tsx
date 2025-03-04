
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out-quint py-4 px-6 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-smooth" : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-2xl font-semibold text-foreground transition-colors">
            Pure<span className="text-clean-600">Clean</span>
          </a>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground/80 hover:text-clean-600 transition-colors font-medium text-sm">
              Services
            </a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-clean-600 transition-colors font-medium text-sm">
              How It Works
            </a>
            <a href="#testimonials" className="text-foreground/80 hover:text-clean-600 transition-colors font-medium text-sm">
              Testimonials
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-clean-600 transition-colors font-medium text-sm">
              Contact
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="default" 
              className="bg-clean-600 hover:bg-clean-700 text-white rounded-full px-6 button-hover-effect"
            >
              Book Now
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-6 px-6 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-6 mt-8">
            <a 
              href="#services" 
              className="text-foreground font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#how-it-works" 
              className="text-foreground font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="text-foreground font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          <div className="mt-auto">
            <Button 
              variant="default" 
              className="w-full bg-clean-600 hover:bg-clean-700 text-white rounded-full button-hover-effect"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
