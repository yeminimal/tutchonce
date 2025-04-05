
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from 'lucide-react';

interface CareerEmptyStateProps {
  onNewPost: () => void;
}

const CareerEmptyState: React.FC<CareerEmptyStateProps> = ({ onNewPost }) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8fffe] mb-4">
        <Briefcase size={24} className="text-[#228977]" />
      </div>
      <h3 className="text-xl font-semibold text-[#228977] mb-2">No Job Listings Yet</h3>
      <p className="text-gray-600 mb-6">Get started by creating your first job listing</p>
      <Button 
        onClick={onNewPost} 
        className="bg-[#228977] hover:bg-[#21665a] text-white"
      >
        <Plus size={16} className="mr-1.5" />
        Create Your First Job Listing
      </Button>
    </div>
  );
};

export default CareerEmptyState;
