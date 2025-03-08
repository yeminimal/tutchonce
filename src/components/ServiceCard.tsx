
import React from 'react';
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: 'general' | 'facility' | 'moveInOut' | 'construction' | 'renovation' | 'janitorial' | 'fumigation';
  title: string;
  description: string;
  image: string;
  isEven: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, isEven }) => {
  return (
    <div 
      className={cn(
        "relative p-8 rounded-2xl card-hover animate-reveal overflow-hidden",
        isEven ? "bg-brand-light" : "bg-white shadow-card"
      )}
    >
      {/* Image with overlay */}
      <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-brand-primary">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
