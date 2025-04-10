
import React, { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      icon: 'general' as const,
      title: "General Cleaning Services",
      description: "Our standard cleaning service includes dusting, vacuuming, mopping, and sanitizing all rooms in your home or office to ensure a spotless environment.",
      image: "/lovable-uploads/ae8c54e6-12ea-41dc-a4cd-10ac2a5bdcaa.png"
    },
    {
      icon: 'facility' as const,
      title: "Facility Management",
      description: "Comprehensive facility management services to keep your property in optimal condition, including maintenance scheduling, repairs coordination, and regular inspections.",
      image: "/lovable-uploads/e9b39e25-128a-4313-b0c8-48266a31044b.png"
    },
    {
      icon: 'moveInOut' as const,
      title: "Move In/Move Out Services",
      description: "Specialized cleaning service for when you're moving in or out of a home, ensuring a clean slate for the next chapter or a spotless property for new occupants.",
      image: "/lovable-uploads/846da206-943c-43d0-9412-22ec95f4db07.png"
    },
    {
      icon: 'construction' as const,
      title: "Post Construction Cleaning",
      description: "Thorough cleaning after construction or renovation projects, removing dust, debris, and construction materials to reveal the beauty of your newly completed space.",
      image: "/lovable-uploads/87e1c0c5-de52-42d3-b2ab-3bd919a3e50a.png"
    },
    {
      icon: 'renovation' as const,
      title: "Renovation Cleaning",
      description: "Specialized cleaning during and after renovation projects to manage dust and debris, keeping your living or working environment as clean as possible throughout the process.",
      image: "/lovable-uploads/b910274f-19f2-4c38-a2e8-0be968c64921.png"
    },
    {
      icon: 'janitorial' as const,
      title: "Janitorial Services",
      description: "Regular janitorial services for businesses and commercial properties, maintaining cleanliness and hygiene standards throughout your workplace on a scheduled basis.",
      image: "/lovable-uploads/e0b762b5-4d17-4227-91ea-f21abf6a519d.png"
    },
    {
      icon: 'fumigation' as const,
      title: "Fumigation",
      description: "Professional fumigation services to eliminate pests and insects, ensuring your property is safe, hygienic, and free from unwanted infestations.",
      image: "/lovable-uploads/17e69d6b-6610-4d6d-9c33-fb135ad22bbe.png"
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
      id="services" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-clean-50 text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
            Our Services
          </span>
          <h2 className="text-4xl font-bold animate-reveal text-brand-primary" style={{ transitionDelay: '100ms' }}>
            Professional Cleaning Services for Every Need
          </h2>
          <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
            We offer a variety of cleaning services to keep your home and office looking their best across Nigeria. 
            All our services are customizable to meet your specific requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              image={service.image}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
