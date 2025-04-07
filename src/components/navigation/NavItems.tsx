
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItemProps {
  handleNavigation: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  closeMobileMenu?: () => void;
  isMobile?: boolean;
}

export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/#services",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Bookings",
    href: "/bookings",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const NavItems: React.FC<NavItemProps> = ({ handleNavigation, closeMobileMenu, isMobile = false }) => {
  const location = useLocation();
  const baseClasses = isMobile 
    ? "text-foreground font-medium text-lg transition-colors hover:text-brand-primary"
    : "text-foreground/80 hover:text-brand-primary transition-colors font-medium text-sm hover:scale-105 duration-200";
    
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    handleNavigation(e, sectionId);
    if (isMobile && closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <>
      <a 
        href="#services" 
        onClick={(e) => handleClick(e, 'services')}
        className={baseClasses}
      >
        Services
      </a>
      <a 
        href="#how-it-works" 
        onClick={(e) => handleClick(e, 'how-it-works')}
        className={baseClasses}
      >
        How It Works
      </a>
      <a 
        href="#testimonials" 
        onClick={(e) => handleClick(e, 'testimonials')}
        className={baseClasses}
      >
        Testimonials
      </a>
      <Link 
        to="/blog" 
        className={baseClasses}
        onClick={() => isMobile && closeMobileMenu && closeMobileMenu()}
      >
        Blog
      </Link>
      <Link 
        to="/careers" 
        className={baseClasses}
        onClick={() => isMobile && closeMobileMenu && closeMobileMenu()}
      >
        Careers
      </Link>
      <Link 
        to="/bookings" 
        className={baseClasses}
        onClick={() => isMobile && closeMobileMenu && closeMobileMenu()}
      >
        Bookings
      </Link>
      <a 
        href="#contact" 
        onClick={(e) => handleClick(e, 'contact')}
        className={baseClasses}
      >
        Contact
      </a>
    </>
  );
};

export default NavItems;
