
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, ArrowRight, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content, link }) => {
  if (link) {
    return (
      <div className="flex items-start animate-reveal hover:translate-x-1 transition-transform duration-300">
        <div className="h-10 w-10 rounded-full bg-clean-50 flex items-center justify-center flex-shrink-0 mr-4">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <a href={link} className="text-muted-foreground mt-1 hover:text-clean-600 transition-colors">
            {content}
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start animate-reveal hover:translate-x-1 transition-transform duration-300">
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
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <Phone size={18} className="text-clean-600" />,
      title: "WhatsApp",
      content: "+234 802 505 8426",
      link: "https://wa.me/+2348025058426"
    },
    {
      icon: <Phone size={18} className="text-clean-600" />,
      title: "WhatsApp",
      content: "+234 803 722 6269",
      link: "https://wa.me/+2348037226269"
    },
    {
      icon: <Mail size={18} className="text-clean-600" />,
      title: "Email",
      content: "tutchoncecleaningservices@gmail.com",
      link: "mailto:tutchoncecleaningservices@gmail.com"
    },
    {
      icon: <MapPin size={18} className="text-clean-600" />,
      title: "Service Area",
      content: "We deliver anywhere within Nigeria"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (formRef.current) {
      const { name, email, phone, service, message } = formData;
      
      if (!name || !email || !phone || !message) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `*New Cleaning Service Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${service || 'Not specified'}\n` +
        `*Message:* ${message}\n\n` +
        `Sent from Tutchonce website`
      );
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/+2348025058426?text=${whatsappMessage}`, '_blank');
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      formRef.current.reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }
  };

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
            <div className="mt-10 space-y-6">
              {contactInfo.map((item, index) => (
                <ContactInfoItem 
                  key={index} 
                  icon={item.icon} 
                  title={item.title} 
                  content={item.content} 
                  link={item.link}
                />
              ))}
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-card p-8 animate-reveal hover:shadow-lg transition-shadow duration-300" style={{ transitionDelay: '300ms' }}>
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your name" 
                    className="w-full transition-all duration-300 focus:ring-2 focus:ring-clean-600"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="Your email" 
                    className="w-full transition-all duration-300 focus:ring-2 focus:ring-clean-600"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input 
                  id="phone"
                  name="phone"
                  placeholder="Your phone number" 
                  className="w-full transition-all duration-300 focus:ring-2 focus:ring-clean-600"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  Service Interested In
                </label>
                <select 
                  name="service"
                  id="service"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground transition-all duration-300 focus:ring-2 focus:ring-clean-600"
                  onChange={handleChange}
                  value={formData.service}
                >
                  <option value="">Select a service</option>
                  <option value="Regular Cleaning">Regular Cleaning</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Move-In/Move-Out">Move-In/Move-Out</option>
                  <option value="Custom Cleaning">Custom Cleaning</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Tell us about your cleaning needs" 
                  className="w-full min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-clean-600"
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-clean-600 hover:bg-clean-700 text-white rounded-full py-6 button-hover-effect group"
              >
                Send Message
                <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
