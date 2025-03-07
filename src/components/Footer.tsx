
import React from 'react';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <a href="#" className="font-display text-2xl font-semibold text-foreground inline-block mb-4">
              Tutch<span className="text-brand-primary">once</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              We provide premium cleaning services for homes and businesses throughout the area.
              Our team of experienced professionals ensures satisfaction with every clean.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors transform hover:scale-110 duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors transform hover:scale-110 duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-primary transition-colors transform hover:scale-110 duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                We deliver anywhere within Nigeria
              </li>
              <li>
                <a href="https://wa.me/+2348025058426" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center">
                  <Phone size={16} className="mr-2" />
                  +234 802 505 8426
                </a>
              </li>
              <li>
                <a href="https://wa.me/+2348037226269" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center">
                  <Phone size={16} className="mr-2" />
                  +234 803 722 6269
                </a>
              </li>
              <li>
                <a href="mailto:tutchoncecleaningservices@gmail.com" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  tutchoncecleaningservices@gmail.com
                </a>
              </li>
              <li className="text-muted-foreground">
                Monday-Friday: 8am-6pm
              </li>
              <li className="text-muted-foreground">
                Saturday: 9am-4pm
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Tutchonce. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors text-sm">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
