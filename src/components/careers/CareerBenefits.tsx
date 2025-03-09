
import React from 'react';
import { Briefcase, Clock, MapPin } from 'lucide-react';

const CareerBenefits = () => {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-primary text-center mb-12 animate-reveal">
          Why Join Tutchonce?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '100ms' }}>
            <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
              <Briefcase className="text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-primary mb-3">Growth Opportunities</h3>
            <p className="text-muted-foreground">
              We invest in our team members' professional development with training programs and clear career advancement paths.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '200ms' }}>
            <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
              <Clock className="text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-primary mb-3">Work-Life Balance</h3>
            <p className="text-muted-foreground">
              We understand the importance of balance and offer flexible scheduling options for many positions.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-card animate-reveal" style={{ transitionDelay: '300ms' }}>
            <div className="h-12 w-12 rounded-full bg-brand-light flex items-center justify-center mb-6">
              <MapPin className="text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-primary mb-3">Nationwide Opportunities</h3>
            <p className="text-muted-foreground">
              With operations across Nigeria, we offer positions in multiple locations to suit your lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerBenefits;
