
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from 'react-router-dom';

const ContactForm = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center">
      <div className="mb-6 md:mb-8">
        <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
          <MessageSquareQuote className="text-brand-primary" size={isMobile ? 28 : 32} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-brand-primary">Need a Cleaning Quote?</h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Get a personalized quotation for your cleaning needs. Our team is ready to assist you with a custom solution that fits your requirements.
        </p>
      </div>
      
      <Button 
        asChild
        className="bg-brand-primary hover:bg-brand-secondary text-white w-full max-w-xs py-5 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
      >
        <Link to="/bookings">
          <MessageSquareQuote size={18} />
          <span className="whitespace-nowrap">Get Quotation Now</span>
        </Link>
      </Button>
    </div>
  );
};

export default ContactForm;
