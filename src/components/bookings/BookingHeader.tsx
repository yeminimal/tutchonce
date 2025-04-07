
import React from 'react';
import { Calendar, Phone, Clock } from 'lucide-react';

const BookingHeader = () => {
  return (
    <div className="text-center mb-12 animate-reveal">
      <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
        Request a Quotation
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
        Get a personalized quote for your specific cleaning needs. Fill out the form below and we'll respond promptly with pricing and availability.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-card flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-4">
            <Calendar className="text-brand-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-brand-primary mb-2">Quick Response</h3>
          <p className="text-muted-foreground text-center">We'll respond to your inquiry within 24 hours.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-card flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-4">
            <Phone className="text-brand-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-brand-primary mb-2">Direct Contact</h3>
          <p className="text-muted-foreground text-center">Get connected directly via WhatsApp for personalized service.</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-card flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-4">
            <Clock className="text-brand-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-brand-primary mb-2">Flexible Scheduling</h3>
          <p className="text-muted-foreground text-center">Book a service at a time that works best for you.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
