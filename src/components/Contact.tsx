
import React, { useEffect, useRef } from 'react';
import ContactInfo from './contact/ContactInfo';
import ContactForm from './contact/ContactForm';

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
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-clean-50 text-clean-800 rounded-full text-sm font-medium mb-6 animate-reveal">
              Contact Us
            </span>
            <h2 className="text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
              Get in Touch
            </h2>
            <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
              Have questions or ready to schedule your cleaning? Contact us today and experience the difference of professional cleaning services throughout Nigeria.
            </p>
            
            {/* Contact Info */}
            <ContactInfo />
          </div>
          
          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
