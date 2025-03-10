
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Check } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create form data to send to Google Script
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('service', formData.service || 'General Cleaning Services');
    submitData.append('message', formData.message);
    
    try {
      // Submit to Google Script
      const scriptUrl = "https://script.google.com/macros/s/AKfycbyLa1pe5yUdZD7pDd0tOQAcSosUlWxop2oRPGOOcFuXK2_LCyltP69CNy0DaVbD0n2t/exec";
      await fetch(scriptUrl, {
        method: 'POST',
        body: submitData
      });
      
      setIsSubmitted(true);
      
      toast({
        title: "Message Sent!",
        description: "We've received your message. Redirecting you to WhatsApp...",
      });
      
      // Format WhatsApp message
      const name = encodeURIComponent(formData.name);
      const email = encodeURIComponent(formData.email);
      const phone = encodeURIComponent(formData.phone);
      const service = encodeURIComponent(formData.service || 'General Cleaning Services');
      const message = encodeURIComponent(formData.message);
      
      // Create WhatsApp URL with formatted message
      const whatsappURL = `https://wa.me/+2348025058426?text=New%20Cleaning%20Request:%0AName:%20${name}%0AEmail:%20${email}%0APhone:%20${phone}%0AService:%20${service}%0AMessage:%20${message}`;
      
      // Redirect after a brief delay
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Reset form
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
            <Check className="text-brand-primary" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-brand-primary">Thank You!</h3>
          <p className="text-muted-foreground">
            Your message has been sent successfully. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1">
              Service Interested In
            </label>
            <Select
              value={formData.service}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="service" className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Cleaning Services</SelectItem>
                <SelectItem value="facility">Facility Management</SelectItem>
                <SelectItem value="moveInOut">Move In/Move Out Services</SelectItem>
                <SelectItem value="construction">Post Construction Cleaning</SelectItem>
                <SelectItem value="renovation">Renovation Cleaning</SelectItem>
                <SelectItem value="janitorial">Janitorial Services</SelectItem>
                <SelectItem value="fumigation">Fumigation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Your Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your cleaning needs"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
