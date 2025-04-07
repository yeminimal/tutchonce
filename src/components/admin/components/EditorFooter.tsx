
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, Upload } from 'lucide-react';

interface EditorFooterProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onUpload: () => void;
  contentType: 'blog' | 'career';
}

const EditorFooter: React.FC<EditorFooterProps> = ({
  onBack,
  onSaveDraft,
  onUpload,
  contentType
}) => {
  const publishLabel = contentType === 'blog' ? 'Publish Post' : 'Publish Job';
  
  return (
    <div className="mt-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center justify-center w-full sm:w-auto"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            className="flex items-center justify-center w-full sm:w-auto bg-white"
          >
            <Save className="mr-1 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button
            type="button"
            onClick={onUpload}
            className="flex items-center justify-center w-full sm:w-auto bg-[#228977] hover:bg-[#21665a]"
          >
            <Upload className="mr-1 h-4 w-4" />
            {publishLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
