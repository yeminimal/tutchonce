
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <a href="#" className="font-display text-2xl font-semibold text-foreground inline-block mb-4">
              Pure<span className="text-clean-600">Clean</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              We provide premium cleaning services for homes and businesses throughout the area.
              Our team of experienced professionals ensures satisfaction with every clean.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-clean-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-clean-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-clean-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-clean-600 transition-colors">
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
                123 Clean Street, Sparkle City, SC 12345
              </li>
              <li>
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@pureclean.com" className="text-muted-foreground hover:text-clean-600 transition-colors">
                  info@pureclean.com
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
            © {currentYear} PureClean. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-clean-600 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-clean-600 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-clean-600 transition-colors text-sm">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
