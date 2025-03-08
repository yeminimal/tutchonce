
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  Building2, 
  Box, 
  HardHat, 
  PaintRoller, 
  ClipboardCheck, 
  FlaskConical 
} from "lucide-react";

export interface ServiceCardProps {
  icon: 'general' | 'facility' | 'moveInOut' | 'construction' | 'renovation' | 'janitorial' | 'fumigation';
  title: string;
  description: string;
  image: string;
  isEven: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, image, isEven }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'general':
        return <Sparkles className="text-brand-primary" />;
      case 'facility':
        return <Building2 className="text-brand-primary" />;
      case 'moveInOut':
        return <Box className="text-brand-primary" />;
      case 'construction':
        return <HardHat className="text-brand-primary" />;
      case 'renovation':
        return <PaintRoller className="text-brand-primary" />;
      case 'janitorial':
        return <ClipboardCheck className="text-brand-primary" />;
      case 'fumigation':
        return <FlaskConical className="text-brand-primary" />;
      default:
        return <Sparkles className="text-brand-primary" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative p-8 pt-14 rounded-2xl card-hover animate-reveal overflow-hidden",
        isEven ? "bg-brand-light" : "bg-white shadow-card"
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10">
        <div className="absolute -top-6 -left-2 h-12 w-12 rounded-full bg-white shadow-smooth flex items-center justify-center">
          {renderIcon()}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-brand-primary">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
