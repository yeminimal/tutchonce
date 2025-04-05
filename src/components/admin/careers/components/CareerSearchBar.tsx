
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';

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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h3 className="text-xl font-semibold text-[#228977]">Career Listings</h3>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-40">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-64">
            <Input 
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <Button 
          onClick={onNewPost} 
          className="bg-[#228977] hover:bg-[#21665a] text-white whitespace-nowrap"
        >
          <Plus size={16} className="mr-1.5" />
          Add New Job
        </Button>
      </div>
    </div>
  );
};

export default CareerSearchBar;
