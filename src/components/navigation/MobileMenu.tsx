
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarCheck, X } from "lucide-react";
import NavItems from './NavItems';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  scrollToContact: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  handleNavigation,
  scrollToContact
}) => {
  if (!isMobileMenuOpen) return null;
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  return (
    <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col pt-20 pb-6 px-6 md:hidden animate-fade-in shadow-md">
      {/* Close button at the top */}
      <button 
        onClick={closeMobileMenu}
        className="absolute top-4 right-4 p-2 text-foreground hover:bg-brand-light rounded-full transition-colors"
        aria-label="Close menu"
      >
        <X size={24} />
      </button>
      
      <nav className="flex flex-col space-y-6 mt-8">
        <NavItems 
          handleNavigation={handleNavigation} 
          closeMobileMenu={closeMobileMenu} 
          isMobile={true} 
        />
      </nav>
      <div className="mt-auto">
        <Button 
          variant="default" 
          className="w-full bg-brand-primary hover:bg-brand-secondary text-white rounded-full button-hover-effect group"
          onClick={() => {
            scrollToContact();
            closeMobileMenu();
          }}
        >
          <CalendarCheck className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
