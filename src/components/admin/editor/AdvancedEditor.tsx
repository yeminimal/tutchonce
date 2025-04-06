
import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import EditorStyles from './components/EditorStyles';
import ImageUploader from './components/ImageUploader';
import EditorToolbar, { editorFormats } from './components/EditorToolbar';

interface AdvancedEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

const AdvancedEditor: React.FC<AdvancedEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className,
  minHeight = '300px',
  onImageUpload
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize editor only after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Get toolbar configuration
  const modules = EditorToolbar({ onImageUpload });
  
  // Handle image upload via toolbar
  if (onImageUpload && modules.toolbar.handlers) {
    modules.toolbar.handlers.image = () => {
      const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    };
  }

  // Only render the editor after the component has mounted
  if (!isMounted) {
    return (
      <div style={{ minHeight }} className="border rounded-md bg-gray-50 flex items-center justify-center">
        <p className="text-muted-foreground">Editor loading...</p>
      </div>
    );
  }

  return (
    <div className={cn("advanced-editor", className)}>
      <EditorStyles minHeight={minHeight} />
      
      <ImageUploader 
        onImageUpload={onImageUpload} 
        quillRef={quillRef} 
      />
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={editorFormats}
        placeholder={placeholder}
        preserveWhitespace={true}
      />
    </div>
  );
};

export default AdvancedEditor;
