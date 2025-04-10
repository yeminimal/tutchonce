
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface CareerEditorHeaderProps {
  isEditing: boolean;
  onBack: () => void;
}

const CareerEditorHeader: React.FC<CareerEditorHeaderProps> = ({ isEditing, onBack }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h3 className="text-xl font-semibold text-[#228977] ml-2">
          {isEditing ? 'Edit Job Listing' : 'Create New Job Listing'}
        </h3>
      </div>
      <p className="mt-2 text-muted-foreground ml-10">
        {isEditing 
          ? 'Update the details of this job listing.' 
          : 'Fill in the details below to create a new job listing.'
        }
      </p>
    </div>
  );
};

export default CareerEditorHeader;
