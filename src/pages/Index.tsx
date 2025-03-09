
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>Tutchonce Cleaning Services | Professional Home Cleaning in Nigeria</title>
        <meta name="description" content="Tutchonce offers premium cleaning services across Nigeria. Specializing in residential and commercial cleaning with professional, reliable and affordable service." />
        <meta name="keywords" content="cleaning services Nigeria, house cleaning Nigeria, professional cleaners Lagos, home cleaning service Abuja, apartment cleaning Nigeria, deep cleaning services, affordable cleaning services, residential cleaning Nigeria, office cleaning Nigeria, best cleaning company Nigeria, Tutchonce cleaning, eco-friendly cleaning, reliable cleaning service" />
        <meta name="author" content="Tutchonce Cleaning Services" />
        <meta property="og:title" content="Tutchonce Cleaning Services | Professional Home Cleaning in Nigeria" />
        <meta property="og:description" content="Transform your space with premium cleaning services from Tutchonce. Serving all areas across Nigeria with reliable, professional cleaning solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tutchonce.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tutchonce Cleaning Services | Professional Home Cleaning in Nigeria" />
        <meta name="twitter:description" content="Professional cleaning services for homes and businesses across Nigeria. Book your cleaning today!" />
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        <Services />
        
        {/* How It Works Section (reduced vertical padding) */}
        <section id="how-it-works" className="py-16 relative">
          <div className="container max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary rounded-full text-sm font-medium mb-5 animate-reveal">
                Simple Process
              </span>
              <h2 className="text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
                How It Works
              </h2>
              <p className="mt-5 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
                Getting your home or office cleaned by our Nigerian professionals is simple and convenient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Step 1 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '300ms' }}>
                <div className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-brand-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Book Online</h3>
                <p className="text-muted-foreground">
                  Select your cleaning service, choose a date and time, and book your professional cleaning in minutes from anywhere in Nigeria.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '400ms' }}>
                <div className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-brand-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">We Clean</h3>
                <p className="text-muted-foreground">
                  Our trained and vetted professional team arrives at your location and provides exceptional cleaning services using quality products.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '500ms' }}>
                <div className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-brand-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Enjoy Your Clean Space</h3>
                <p className="text-muted-foreground">
                  Return to a spotless, fresh home or office that's been thoroughly cleaned to exceed your expectations.
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
