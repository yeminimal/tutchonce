
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  accent?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  content, 
  rating, 
  accent = false 
}) => {
  return (
    <div 
      className={cn(
        "p-8 rounded-2xl card-hover animate-reveal",
        accent 
          ? "bg-clean-600 text-white" 
          : "bg-white shadow-card"
      )}
    >
      {/* Stars */}
      <div className="flex mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={cn(
              "mr-1", 
              i < rating 
                ? accent ? "fill-white text-white" : "fill-amber-400 text-amber-400" 
                : accent ? "text-white/30" : "text-gray-300"
            )} 
          />
        ))}
      </div>
      
      {/* Content */}
      <p className={cn(
        "text-lg mb-6", 
        accent ? "text-white/90" : "text-muted-foreground"
      )}>
        "{content}"
      </p>
      
      {/* Author */}
      <div className="flex items-center">
        <div 
          className={cn(
            "h-10 w-10 rounded-full mr-3 flex items-center justify-center text-lg font-semibold",
            accent ? "bg-white text-clean-600" : "bg-clean-100 text-clean-600"
          )}
        >
          {name.charAt(0)}
        </div>
        <div>
          <h4 className={cn(
            "font-medium", 
            accent ? "text-white" : "text-foreground"
          )}>
            {name}
          </h4>
          <p className={cn(
            "text-sm", 
            accent ? "text-white/70" : "text-muted-foreground"
          )}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "I've tried several cleaning services, but none compare to the level of detail and care they provide. My home has never looked better!",
      rating: 5
    },
    {
      name: "Michael Robinson",
      role: "Apartment Owner",
      content: "Reliable, thorough, and professional. I love coming home after they've cleaned - it feels like a luxury hotel every time.",
      rating: 5,
      accent: true
    },
    {
      name: "Emma Davis",
      role: "Busy Professional",
      content: "Their cleaning team is exceptional! They're respectful of my space and consistently deliver outstanding results that exceed my expectations.",
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

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

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-24 bg-clean-50"
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-clean-800 rounded-full text-sm font-medium mb-6 animate-reveal">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
            We take pride in exceeding our clients' expectations. Here's what some of our happy customers have to say about our services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              name={testimonial.name} 
              role={testimonial.role} 
              content={testimonial.content} 
              rating={testimonial.rating} 
              accent={testimonial.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
