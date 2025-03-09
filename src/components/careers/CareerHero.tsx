
import React from 'react';

const CareerHero = () => {
  return (
    <section className="pt-32 pb-16 px-6 bg-brand-light">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-white text-brand-primary rounded-full text-sm font-medium mb-6 animate-reveal">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold animate-reveal text-brand-primary" style={{ transitionDelay: '100ms' }}>
            Build Your Career With Us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
            We're looking for talented individuals to join our growing team and help deliver exceptional cleaning services across Nigeria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
