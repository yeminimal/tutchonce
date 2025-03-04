
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start animate-reveal">
      <div className="h-10 w-10 rounded-full bg-clean-50 flex items-center justify-center flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-muted-foreground mt-1">{content}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: <Phone size={18} className="text-clean-600" />,
      title: "Phone",
      content: "(123) 456-7890"
    },
    {
      icon: <Mail size={18} className="text-clean-600" />,
      title: "Email",
      content: "info@pureclean.com"
    },
    {
      icon: <MapPin size={18} className="text-clean-600" />,
      title: "Location",
      content: "123 Clean Street, Sparkle City, SC 12345"
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
              Have questions or ready to schedule your cleaning? Contact us today and experience the difference of professional cleaning services.
            </p>
            
            {/* Contact Info */}
            <div className="mt-10 space-y-6">
              {contactInfo.map((item, index) => (
                <ContactInfoItem 
                  key={index} 
                  icon={item.icon} 
                  title={item.title} 
                  content={item.content} 
                />
              ))}
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-card p-8 animate-reveal" style={{ transitionDelay: '300ms' }}>
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="Your name" 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Your email" 
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input 
                  id="phone"
                  placeholder="Your phone number" 
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  Service Interested In
                </label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground">
                  <option value="">Select a service</option>
                  <option value="regular">Regular Cleaning</option>
                  <option value="deep">Deep Cleaning</option>
                  <option value="move">Move-In/Move-Out</option>
                  <option value="custom">Custom Cleaning</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your cleaning needs" 
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-clean-600 hover:bg-clean-700 text-white rounded-full py-6 button-hover-effect group"
              >
                Send Message
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
