
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveToDatabase = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error('Error saving to database:', error);
        // Still continue with WhatsApp message even if DB save fails
        return false;
      }
      
      console.log('Contact saved to database:', data);
      return true;
    } catch (error) {
      console.error('Exception saving to database:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple form validation
    if (formRef.current) {
      const { name, email, phone, message } = formData;
      
      if (!name || !email || !phone || !message) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Save to Supabase
      const dbSaved = await saveToDatabase();
      
      // Create WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `*New Cleaning Service Inquiry*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${formData.service || 'Not specified'}\n` +
        `*Message:* ${message}\n\n` +
        `Sent from Tutchonce website`
      );
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/+2348025058426?text=${whatsappMessage}`, '_blank');
      
      // Show success message
      toast({
        title: "Message sent!",
        description: dbSaved 
          ? "We've saved your information and will get back to you soon." 
          : "We'll get back to you as soon as possible.",
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
    setIsSubmitting(false);
  };

  return (
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
