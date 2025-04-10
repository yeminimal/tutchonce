
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
  withLink?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  withLink = true,
  className
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };
  
  const variantClasses = {
    default: 'text-foreground',
    light: 'text-white'
  };

  const logoContent = (
    <div className={cn(
      "font-display font-semibold transition-colors flex items-center",
      sizeClasses[size],
      variantClasses[variant],
      className
    )}>
      <span className="relative">
        Tutch
        <span className={cn(
          "text-brand-primary",
          variant === 'light' && 'text-brand-light'
        )}>once</span>
      </span>
    </div>
  );

  if (withLink) {
    return (
      <Link to="/" aria-label="Tutchonce - Home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary rounded-sm">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;
