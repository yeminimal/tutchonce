
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNewPost: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onNewPost
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h3 className="text-xl font-semibold text-[#228977]">Blog Management</h3>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Input 
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          onClick={onNewPost} 
          className="bg-[#228977] hover:bg-[#21665a] text-white"
        >
          <Plus size={16} className="mr-1.5" />
          New Post
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
