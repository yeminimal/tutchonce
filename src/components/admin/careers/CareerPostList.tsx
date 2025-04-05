
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, MapPin, Briefcase } from 'lucide-react';
import { CareerPost } from './types';

interface CareerPostListProps {
  posts: CareerPost[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onNewPost: () => void;
  onEditPost: (post: CareerPost) => void;
  onDeletePost: (id: string) => void;
}

const CareerPostList: React.FC<CareerPostListProps> = ({
  posts,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onNewPost,
  onEditPost,
  onDeletePost
}) => {
  return (
    <div>
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
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${post.status === 'active' ? 'bg-green-100 text-green-800' : 
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {post.status === 'active' ? 'Active' : 
                         post.status === 'draft' ? 'Draft' : 'Closed'}
                      </span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-500">Posted: {new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    
                    <h4 className="font-semibold text-lg text-[#228977]">{post.title}</h4>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600 flex-wrap gap-y-1">
                      <div className="flex items-center mr-4">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        {post.location}
                      </div>
                      <div className="flex items-center mr-4">
                        <Briefcase size={16} className="mr-1 text-gray-400" />
                        {post.type}
                      </div>
                      {post.salary && (
                        <div className="flex items-center">
                          <span className="text-sm">
                            {post.salary}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-[#228977] border-[#228977] hover:bg-[#f8fffe]" 
                      onClick={() => onEditPost(post)}
                    >
                      <Edit size={14} className="mr-1.5" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-200 hover:bg-red-50" 
                      onClick={() => onDeletePost(post.id)}
                    >
                      <Trash2 size={14} className="mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8fffe] mb-4">
            <Briefcase size={24} className="text-[#228977]" />
          </div>
          <h3 className="text-xl font-semibold text-[#228977] mb-2">No Job Listings Yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first job listing</p>
          <Button 
            onClick={onNewPost} 
            className="bg-[#228977] hover:bg-[#21665a] text-white"
          >
            <Plus size={16} className="mr-1.5" />
            Create Your First Job Listing
          </Button>
        </div>
      )}
    </div>
  );
};

export default CareerPostList;
