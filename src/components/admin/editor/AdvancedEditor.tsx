
import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Key for forcing re-render if editor crashes
  const [editorKey, setEditorKey] = React.useState<number>(0);
  
  // Error recovery mechanism
  useEffect(() => {
    const handleEditorError = () => {
      console.log("Editor recovery triggered");
      setEditorKey(prev => prev + 1);
    };
    
    window.addEventListener('error', handleEditorError);
    
    return () => {
      window.removeEventListener('error', handleEditorError);
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: onImageUpload ? handleImageUpload : undefined
      }
    },
    clipboard: {
      // Toggle to add or disable the clipboard module
      matchVisual: false
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  function handleImageUpload() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      const range = quill.getSelection() || { index: 0, length: 0 };
      
      // Show loading state
      toast({
        title: "Uploading...",
        description: "Please wait while your image is being uploaded."
      });

      // Don't insert placeholder to avoid editor state issues
      
      // Upload the image
      const imageUrl = await onImageUpload(file);
      
      // Insert the uploaded image
      quill.insertEmbed(range.index, 'image', imageUrl);
      
      // Move cursor after the image
      quill.setSelection(range.index + 1, 0);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      });
    } catch (error) {
      console.error('Image upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Function to handle manual content updates without triggering internal editor state issues
  const handleChange = (content: string) => {
    // Apply some debouncing/throttling to avoid performance issues
    onChange(content);
  };

  return (
    <div className={cn("advanced-editor", className)}>
      <style>
        {`
          .ql-container {
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            background: white;
            font-family: inherit;
            font-size: 1rem;
          }
          .ql-toolbar {
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            background: #f9fafb;
            border-color: #d1d5db;
          }
          .ql-editor {
            min-height: ${minHeight};
            max-height: 60vh;
            overflow-y: auto;
          }
          .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote {
            margin-bottom: 1em;
          }
          .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
            margin-bottom: 0.5em;
            font-weight: 600;
          }
          .quill {
            width: 100%;
          }
          .ql-snow .ql-tooltip {
            z-index: 50;
          }
        `}
      </style>
      
      {onImageUpload && (
        <div className="upload-container mb-2 flex justify-end">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-[#228977] border-[#228977] hover:bg-[#f8fffe]"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={16} className="mr-1.5" />
            Upload Image
          </Button>
        </div>
      )}
      
      <ReactQuill
        key={`editor-${editorKey}`}
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AdvancedEditor;
