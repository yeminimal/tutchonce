
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.classList.add('smooth-scroll');
    
    // Handle intersection observation for animation
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-reveal').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
      document.querySelectorAll('.animate-reveal').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        
        {/* How It Works Section (simplified) */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-clean-50 text-clean-800 rounded-full text-sm font-medium mb-6 animate-reveal">
                Simple Process
              </span>
              <h2 className="text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
                How It Works
              </h2>
              <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
                Getting your home cleaned by our professionals is simple and convenient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '300ms' }}>
                <div className="h-16 w-16 rounded-full bg-clean-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-clean-600">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Book Online</h3>
                <p className="text-muted-foreground">
                  Select your service, choose a date and time, and book your cleaning in minutes.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '400ms' }}>
                <div className="h-16 w-16 rounded-full bg-clean-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-clean-600">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">We Clean</h3>
                <p className="text-muted-foreground">
                  Our professional team arrives at your home and provides exceptional cleaning services.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '500ms' }}>
                <div className="h-16 w-16 rounded-full bg-clean-50 flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-clean-600">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Enjoy Your Clean Home</h3>
                <p className="text-muted-foreground">
                  Return to a spotless, fresh home that's been cleaned to your satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
