
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import NavItems from './NavItems';

interface DesktopMenuProps {
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  scrollToContact: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ handleNavigation, scrollToContact }) => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <NavItems handleNavigation={handleNavigation} />
      </nav>
      
      <div className="hidden md:block">
        <Button 
          variant="default" 
          className="bg-brand-primary hover:bg-brand-secondary text-white rounded-full px-6 button-hover-effect group"
          onClick={scrollToContact}
        >
          <CalendarCheck className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Book Now
        </Button>
      </div>
    </>
  );
};

export default DesktopMenu;
