
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CareerSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onNewPost: () => void;
}

const CareerSearchBar: React.FC<CareerSearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onNewPost 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="w-full md:flex-1 space-y-4 md:space-y-0 md:space-x-4 md:flex md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 border-gray-300"
            placeholder="Search job listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button
        className="whitespace-nowrap bg-[#228977] hover:bg-[#21665a] text-white w-full md:w-auto"
        onClick={onNewPost}
      >
        <PlusCircle size={18} className="mr-2" />
        New Job Listing
      </Button>
    </div>
  );
};

export default CareerSearchBar;
