
import React, { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      icon: 'general' as const,
      title: "General Cleaning Services",
      description: "Our standard cleaning service includes dusting, vacuuming, mopping, and sanitizing all rooms in your home or office to ensure a spotless environment.",
      image: "public/lovable-uploads/c5442ef4-b436-4d8d-8bc2-c63c107e1d08.png"
    },
    {
      icon: 'facility' as const,
      title: "Facility Management",
      description: "Comprehensive facility management services to keep your property in optimal condition, including maintenance scheduling, repairs coordination, and regular inspections.",
      image: "public/lovable-uploads/e36c2a0a-ff4e-4be4-bf6c-0366d214a280.png"
    },
    {
      icon: 'moveInOut' as const,
      title: "Move In/Move Out Services",
      description: "Specialized cleaning service for when you're moving in or out of a home, ensuring a clean slate for the next chapter or a spotless property for new occupants.",
      image: "public/lovable-uploads/f0d47f10-fab6-41e8-80f1-9e70448d4b9f.png"
    },
    {
      icon: 'construction' as const,
      title: "Post Construction Cleaning",
      description: "Thorough cleaning after construction or renovation projects, removing dust, debris, and construction materials to reveal the beauty of your newly completed space.",
      image: "public/lovable-uploads/2a1f0653-a36e-411e-a5f8-6f8803238409.png"
    },
    {
      icon: 'renovation' as const,
      title: "Renovation Cleaning",
      description: "Specialized cleaning during and after renovation projects to manage dust and debris, keeping your living or working environment as clean as possible throughout the process.",
      image: "public/lovable-uploads/1a4c8b9f-04c2-4930-bdbe-b00b4653e497.png"
    },
    {
      icon: 'janitorial' as const,
      title: "Janitorial Services",
      description: "Regular janitorial services for businesses and commercial properties, maintaining cleanliness and hygiene standards throughout your workplace on a scheduled basis.",
      image: "public/lovable-uploads/9b72914e-7abb-41a5-9f3e-516dea65d92c.png"
    },
    {
      icon: 'fumigation' as const,
      title: "Fumigation",
      description: "Professional fumigation services to eliminate pests and insects, ensuring your property is safe, hygienic, and free from unwanted infestations.",
      image: "public/lovable-uploads/06012ea1-8e1f-43a9-9839-a10a76d6f3df.png"
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
