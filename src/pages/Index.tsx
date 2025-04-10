
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
    <div className="min-h-screen bg-background overflow-fix">
      <Helmet>
        <title>Tutchonce Cleaning Services | Professional Home & Office Cleaning in Nigeria</title>
        <meta name="description" content="Tutchonce offers premium cleaning services across Nigeria. Specializing in residential, commercial, post-construction, and facility management with reliable, affordable service." />
        <meta name="keywords" content="cleaning services Nigeria, house cleaning Nigeria, professional cleaners Lagos, home cleaning service Abuja, apartment cleaning Nigeria, deep cleaning services, affordable cleaning services, residential cleaning Nigeria, office cleaning Nigeria, best cleaning company Nigeria, Tutchonce cleaning, eco-friendly cleaning, reliable cleaning service, janitorial services, post construction cleaning, move in move out cleaning" />
        <meta name="author" content="Tutchonce Cleaning Services" />
        <meta property="og:title" content="Tutchonce Cleaning Services | Professional Home & Office Cleaning in Nigeria" />
        <meta property="og:description" content="Transform your space with premium cleaning services from Tutchonce. Serving all areas across Nigeria with reliable, professional cleaning solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tutchonce.com" />
        <meta property="og:image" content="/lovable-uploads/06012ea1-8e1f-43a9-9839-a10a76d6f3df.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tutchonce Cleaning Services | Professional Home & Office Cleaning in Nigeria" />
        <meta name="twitter:description" content="Professional cleaning services for homes and businesses across Nigeria. Book your cleaning today!" />
        <meta name="twitter:image" content="/lovable-uploads/06012ea1-8e1f-43a9-9839-a10a76d6f3df.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#228977" />
        <link rel="canonical" href="https://tutchonce.com" />
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        <Services />
        
        {/* How It Works Section (reduced vertical padding) */}
        <section id="how-it-works" className="py-12 md:py-16 relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <span className="inline-block px-4 py-1.5 bg-brand-light text-brand-primary rounded-full text-sm font-medium mb-4 md:mb-5 animate-reveal">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
                How It Works
              </h2>
              <p className="mt-3 md:mt-5 text-base md:text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
                Getting your home or office cleaned by our Nigerian professionals is simple and convenient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Step 1 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '300ms' }}>
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <span className="text-lg md:text-xl font-bold text-brand-primary">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">Book Online</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Select your cleaning service, choose a date and time, and book your professional cleaning in minutes from anywhere in Nigeria.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '400ms' }}>
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <span className="text-lg md:text-xl font-bold text-brand-primary">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">We Clean</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Our trained and vetted professional team arrives at your location and provides exceptional cleaning services using quality products.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center animate-reveal" style={{ transitionDelay: '500ms' }}>
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <span className="text-lg md:text-xl font-bold text-brand-primary">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">Enjoy Your Clean Space</h3>
                <p className="text-sm md:text-base text-muted-foreground">
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
