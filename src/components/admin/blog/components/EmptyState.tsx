
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onNewPost: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewPost }) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8fffe] mb-4">
        <Plus size={24} className="text-[#228977]" />
      </div>
      <h3 className="text-xl font-semibold text-[#228977] mb-2">No Blog Posts Yet</h3>
      <p className="text-gray-600 mb-6">Get started by creating your first blog post</p>
      <Button 
        onClick={onNewPost} 
        className="bg-[#228977] hover:bg-[#21665a] text-white"
      >
        <Plus size={16} className="mr-1.5" />
        Create Your First Post
      </Button>
    </div>
  );
};

export default EmptyState;
