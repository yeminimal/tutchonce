
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CalendarCheck } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const features = [
    "Professional cleaners",
    "Eco-friendly products",
    "100% satisfaction guarantee"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.animate-reveal');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.animate-reveal');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-brand-light rounded-full filter blur-3xl opacity-60 z-0"></div>
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-brand-light rounded-full filter blur-3xl opacity-70 z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
              #1 Home Cleaning Service
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-reveal" style={{ transitionDelay: '100ms' }}>
              Pristine Homes, <br />
              <span className="text-brand-primary">Peaceful Lives</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
              Experience the joy of coming home to a perfectly clean space. Tutchonce professional cleaning service delivers exceptional results, giving you more time to enjoy life.
            </p>
            
            {/* Feature list */}
            <div className="mt-8 space-y-4 animate-reveal" style={{ transitionDelay: '300ms' }}>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-light flex items-center justify-center mr-3">
                    <Check size={14} className="text-brand-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-reveal" style={{ transitionDelay: '400ms' }}>
              <Button 
                className="bg-brand-primary hover:bg-brand-secondary text-white rounded-full px-8 py-6 button-hover-effect group"
                onClick={scrollToContact}
              >
                <CalendarCheck className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Book a Cleaning
              </Button>
              <Button 
                variant="outline" 
                className="border-brand-light hover:bg-brand-light text-foreground rounded-full px-8 py-6 button-hover-effect group"
                onClick={scrollToServices}
              >
                See Services
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-reveal" style={{ transitionDelay: '500ms' }}>
            <div className="aspect-square max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light/50 to-brand-light/30 opacity-70 rounded-2xl z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80" 
                alt="Nigerian lady cleaning" 
                className="w-full h-full object-cover rounded-2xl image-filter transition-transform duration-700 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/640x640?text=Tutchonce+Cleaning';
                }}
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-12 glass px-5 py-4 rounded-xl shadow-smooth animate-float max-w-xs hover:translate-y-[-5px] transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Trusted by</h4>
                  <p className="text-sm text-muted-foreground">150+ happy homes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
