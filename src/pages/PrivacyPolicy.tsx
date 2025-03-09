
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Tutchonce Cleaning Services</title>
        <meta name="description" content="Tutchonce Cleaning Services privacy policy - how we handle your data and protect your privacy." />
      </Helmet>
      
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Introduction</h2>
              <p className="text-muted-foreground">
                At Tutchonce Cleaning Services, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Contact us through our website</li>
                <li>Request a quote for our services</li>
                <li>Schedule a cleaning service</li>
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Apply for a job position</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This information may include your name, email address, phone number, address, payment information, and any other details you choose to provide.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send administrative information, such as appointment confirmations</li>
                <li>Send marketing communications, if you have opted in to receive them</li>
                <li>Personalize your experience on our website</li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground">
                We respect your privacy and will not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Data Security</h2>
              <p className="text-muted-foreground">
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights and are required to keep the information confidential. When you place orders or access your personal information, we offer the use of a secure server. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, correct, or delete your personal information. If you would like to exercise any of these rights, please contact us using the information provided below. You may also opt-out of receiving marketing communications from us by following the unsubscribe instructions included in these communications.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-primary mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2 text-brand-primary">
                tutchoncecleaningservices@gmail.com<br />
                +234 802 505 8426<br />
                +234 803 722 6269
              </p>
            </section>
            
            <p className="text-sm text-muted-foreground border-t border-gray-100 pt-4 mt-6">
              Last Updated: July 2023
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
