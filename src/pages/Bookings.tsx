
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import BookingForm from '@/components/bookings/BookingForm';
import BookingHeader from '@/components/bookings/BookingHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

const Bookings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleBookingSubmit = async (bookingData: {
    name: string;
    contact: string;
    service: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('bookings')
        .insert([
          { 
            name: bookingData.name,
            contact: bookingData.contact,
            service: bookingData.service,
            message: bookingData.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) {
        console.error('Error saving booking:', error);
        toast({
          variant: "destructive",
          title: "Error saving booking",
          description: "Your booking wasn't saved to our system, but we'll still connect you via WhatsApp."
        });
        // Continue with WhatsApp even if Supabase fails
      }
      
      // Generate WhatsApp message
      const whatsappNumber = "+2348025058426";
      const message = `Hello Tutchonce, I'm ${bookingData.name}, and I'm inquiring about your ${bookingData.service} service. Could you please provide me with a quotation?\n\n${bookingData.message}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error processing booking:', error);
      toast({
        variant: "destructive",
        title: "Error processing booking",
        description: "There was a problem processing your request. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book a Service | Tutchonce Cleaning Services</title>
        <meta name="description" content="Request a quote for Tutchonce Cleaning Services. Our professional team will provide you with a customized cleaning solution for your needs." />
      </Helmet>
      
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-6">
          <div className="container max-w-5xl mx-auto">
            <BookingHeader />
            <BookingForm 
              onSubmit={handleBookingSubmit} 
              isSubmitting={isSubmitting}
              formSubmitted={formSubmitted}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Bookings;
