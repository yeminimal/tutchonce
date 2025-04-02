
import React, { useEffect, useRef } from 'react';
import ContactInfo from './contact/ContactInfo';
import ContactForm from './contact/ContactForm';
import ContactSection from './contact/ContactSection';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="contact" 
      ref={sectionRef}
      className="py-24 relative"
    >
      {/* Background blur effect */}
      <div className="absolute top-40 -right-20 w-72 h-72 bg-clean-100 rounded-full filter blur-3xl opacity-60 z-0"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <ContactSection 
              subtitle="Contact Us"
              title="Ready for a Cleaner Space?"
              description="Contact us for a personalized cleaning solution. Our team is ready to provide you with professional cleaning services throughout Nigeria."
            />
            
            {/* Contact Info */}
            <ContactInfo />
          </div>
          
          {/* CTA Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
