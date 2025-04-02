
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from 'lucide-react';

const ContactForm = () => {
  const handleGetQuotation = () => {
    // WhatsApp redirect
    const whatsappNumber = "+2348025058426";
    const message = "Hello Tutchonce Cleaning Services, I would like to get a quotation for your cleaning services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
          <MessageSquareQuote className="text-brand-primary" size={32} />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-brand-primary">Need a Cleaning Quote?</h3>
        <p className="text-muted-foreground mb-6">
          Get a personalized quotation for your cleaning needs. Our team is ready to assist you with a custom solution that fits your requirements.
        </p>
      </div>
      
      <Button 
        onClick={handleGetQuotation}
        className="bg-brand-primary hover:bg-brand-secondary text-white w-full max-w-xs py-6 rounded-full text-lg font-medium animate-pulse-subtle transition-all duration-300 hover:scale-105"
      >
        <MessageSquareQuote className="mr-2" />
        Get Quotation on WhatsApp
      </Button>
    </div>
  );
};

export default ContactForm;
