
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUpload: ((file: File) => Promise<string>) | undefined;
  quillRef: React.RefObject<any>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, quillRef }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!onImageUpload) return null;

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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

  return (
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
        onClick={handleImageUpload}
      >
        <UploadCloud size={16} className="mr-1.5" />
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUploader;
