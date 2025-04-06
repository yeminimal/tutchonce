
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, Upload, X } from 'lucide-react';

interface EditorFooterProps {
  onBack: () => void;
  onSaveDraft?: () => void;
  onUpload?: () => void;
  contentType: 'blog' | 'career';
}

const EditorFooter: React.FC<EditorFooterProps> = ({ 
  onBack, 
  onSaveDraft, 
  onUpload,
  contentType 
}) => {
  return (
    <div className="flex justify-end space-x-3">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className="border-gray-300 text-gray-700"
      >
        <X size={16} className="mr-1.5" />
        Cancel
      </Button>
      
      {onSaveDraft && (
        <Button 
          type="button"
          onClick={onSaveDraft}
          variant="outline"
          className="border-[#228977] text-[#228977] hover:bg-[#f8fffe]"
        >
          <Save size={16} className="mr-1.5" />
          Save as Draft
        </Button>
      )}
      
      {onUpload ? (
        <Button 
          type="button"
          onClick={onUpload}
          className="bg-[#228977] hover:bg-[#21665a] text-white"
        >
          <Upload size={16} className="mr-1.5" />
          Publish {contentType === 'blog' ? 'Post' : 'Job'}
        </Button>
      ) : (
        <Button 
          type="submit" 
          className="bg-[#228977] hover:bg-[#21665a] text-white"
        >
          <Upload size={16} className="mr-1.5" />
          Publish {contentType === 'blog' ? 'Post' : 'Job'}
        </Button>
      )}
    </div>
  );
};

export default EditorFooter;
