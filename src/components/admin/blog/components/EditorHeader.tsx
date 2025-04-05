
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface EditorHeaderProps {
  isEditing: boolean;
  onBack: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ isEditing, onBack }) => {
  return (
    <div className="mb-6 flex items-center">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
      >
        <ArrowLeft size={20} />
      </Button>
      <h3 className="text-xl font-semibold text-[#228977] ml-2">
        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h3>
    </div>
  );
};

export default EditorHeader;
