
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  Building2, 
  Box, 
  HardHat, 
  PaintRoller, 
  ClipboardCheck, 
  Spray 
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
        return <Sparkles className="text-clean-600" />;
      case 'facility':
        return <Building2 className="text-clean-600" />;
      case 'moveInOut':
        return <Box className="text-clean-600" />;
      case 'construction':
        return <HardHat className="text-clean-600" />;
      case 'renovation':
        return <PaintRoller className="text-clean-600" />;
      case 'janitorial':
        return <ClipboardCheck className="text-clean-600" />;
      case 'fumigation':
        return <Spray className="text-clean-600" />;
      default:
        return <Sparkles className="text-clean-600" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl card-hover animate-reveal overflow-hidden",
        isEven ? "bg-clean-50" : "bg-white shadow-card"
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
        <div className="absolute -top-6 left-8 h-12 w-12 rounded-full bg-white shadow-smooth flex items-center justify-center">
          {renderIcon()}
        </div>
        <h3 className="mt-6 text-xl font-semibold text-brand-primary">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
