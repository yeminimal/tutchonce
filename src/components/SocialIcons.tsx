
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface SocialIconsProps {
  className?: string;
  iconSize?: number;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ className = '', iconSize = 20 }) => {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/tutchoncecleaning", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/tutchoncecleaning", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/tutchonceclean", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/tutchoncecleaning", label: "Youtube" }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${social.label}`}
          className="text-muted-foreground hover:text-brand-primary transition-colors duration-200"
        >
          <social.icon size={iconSize} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
