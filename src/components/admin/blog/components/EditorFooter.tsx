
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface EditorFooterProps {
  onBack: () => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ onBack }) => {
  return (
    <div className="flex justify-end space-x-3">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className="border-gray-300 text-gray-700"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="bg-[#228977] hover:bg-[#21665a] text-white"
      >
        <Save size={16} className="mr-1.5" />
        Save Post
      </Button>
    </div>
  );
};

export default EditorFooter;
