
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, ArrowLeft, MapPin, Briefcase, Save } from 'lucide-react';
import AdvancedEditor from './editor/AdvancedEditor';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CareerPost {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  qualifications?: string;
  benefits?: string;
  salary?: string;
  applicationProcess?: string;
  date: string;
  status: 'active' | 'draft' | 'closed';
}

const defaultCareerPost: CareerPost = {
  id: '',
  title: '',
  location: '',
  type: 'Full-time',
  description: '',
  requirements: '',
  qualifications: '',
  benefits: '',
  salary: '',
  applicationProcess: '<p>To apply for this position, please send your resume and cover letter to <a href="mailto:careers@tutchonce.com">careers@tutchonce.com</a></p>',
  date: new Date().toISOString().split('T')[0],
  status: 'active'
};

const CareerDashboard = () => {
  const [posts, setPosts] = useState<CareerPost[]>([]);
  const [currentPost, setCurrentPost] = useState<CareerPost | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('careerPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);
  
  const savePosts = (updatedPosts: CareerPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('careerPosts', JSON.stringify(updatedPosts));
  };
  
  const handleNewPost = () => {
    setCurrentPost({
      ...defaultCareerPost,
      id: Date.now().toString(),
    });
    setView('editor');
  };
  
  const handleEditPost = (post: CareerPost) => {
    setCurrentPost({ ...post });
    setView('editor');
  };
  
  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      savePosts(updatedPosts);
      toast({
        title: "Job Deleted",
        description: "The job listing has been deleted successfully.",
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost) return;
    
    if (!currentPost.title.trim()) {
      toast({
        title: "Error",
        description: "Job title is required",
        variant: "destructive"
      });
      return;
    }
    
    if (!currentPost.location.trim()) {
      toast({
        title: "Error",
        description: "Job location is required",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPosts = currentPost.id && posts.some(post => post.id === currentPost.id)
      ? posts.map(post => post.id === currentPost.id ? currentPost : post)
      : [...posts, currentPost];
    
    savePosts(updatedPosts);
    setCurrentPost(null);
    setView('list');
    
    toast({
      title: "Success",
      description: `Job listing has been ${currentPost.id && posts.some(post => post.id === currentPost.id) ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleBackToList = () => {
    if (currentPost && (currentPost.title || currentPost.description)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        setCurrentPost(null);
        setView('list');
      }
    } else {
      setCurrentPost(null);
      setView('list');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  if (view === 'editor' && currentPost) {
    return (
      <div>
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={handleBackToList}
            className="text-[#228977] hover:text-[#21665a] hover:bg-[#f8fffe] p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h3 className="text-xl font-semibold text-[#228977] ml-2">
            {currentPost.id && posts.some(post => post.id === currentPost.id) ? 'Edit Job Listing' : 'Create New Job Listing'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-base font-medium text-[#21665a]">
                          Job Title
                        </Label>
                        <Input 
                          id="title"
                          value={currentPost.title}
                          onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                          placeholder="e.g. Cleaning Technician"
                          className="mt-1.5 border-gray-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type" className="text-base font-medium text-[#21665a]">
                          Employment Type
                        </Label>
                        <Select 
                          value={currentPost.type}
                          onValueChange={(value) => setCurrentPost({...currentPost, type: value})}
                        >
                          <SelectTrigger className="mt-1.5 border-gray-300">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Temporary">Temporary</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location" className="text-base font-medium text-[#21665a]">
                          Location
                        </Label>
                        <Input 
                          id="location"
                          value={currentPost.location}
                          onChange={(e) => setCurrentPost({...currentPost, location: e.target.value})}
                          placeholder="e.g. Lagos, Nigeria"
                          className="mt-1.5 border-gray-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="salary" className="text-base font-medium text-[#21665a]">
                          Salary Range (Optional)
                        </Label>
                        <Input 
                          id="salary"
                          value={currentPost.salary || ''}
                          onChange={(e) => setCurrentPost({...currentPost, salary: e.target.value})}
                          placeholder="e.g. ₦150,000 - ₦250,000 per month"
                          className="mt-1.5 border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-base font-medium text-[#21665a]">
                        Job Description
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.description}
                          onChange={(value) => setCurrentPost({...currentPost, description: value})}
                          placeholder="Describe the job role and responsibilities"
                          minHeight="250px"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="requirements" className="text-base font-medium text-[#21665a]">
                        Requirements
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.requirements}
                          onChange={(value) => setCurrentPost({...currentPost, requirements: value})}
                          placeholder="List the job requirements"
                          minHeight="200px"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="qualifications" className="text-base font-medium text-[#21665a]">
                        Qualifications
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.qualifications || ''}
                          onChange={(value) => setCurrentPost({...currentPost, qualifications: value})}
                          placeholder="List required qualifications, education, certifications, etc."
                          minHeight="200px"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="benefits" className="text-base font-medium text-[#21665a]">
                        Benefits
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.benefits || ''}
                          onChange={(value) => setCurrentPost({...currentPost, benefits: value})}
                          placeholder="List employee benefits, perks, etc."
                          minHeight="200px"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="applicationProcess" className="text-base font-medium text-[#21665a]">
                        Application Process
                      </Label>
                      <div className="mt-1.5">
                        <AdvancedEditor 
                          value={currentPost.applicationProcess || ''}
                          onChange={(value) => setCurrentPost({...currentPost, applicationProcess: value})}
                          placeholder="Explain how to apply for this position"
                          minHeight="150px"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h4 className="font-medium text-[#228977] mb-4">Listing Status</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="status" className="text-sm font-medium text-[#21665a]">
                          Status
                        </Label>
                        <Select 
                          value={currentPost.status}
                          onValueChange={(value: 'active' | 'draft' | 'closed') => setCurrentPost({...currentPost, status: value})}
                        >
                          <SelectTrigger className="mt-1.5 border-gray-300">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="postDate" className="text-sm font-medium text-[#21665a]">
                          Publish Date
                        </Label>
                        <Input 
                          id="postDate"
                          type="date"
                          value={currentPost.date}
                          onChange={(e) => setCurrentPost({...currentPost, date: e.target.value})}
                          className="mt-1.5 border-gray-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBackToList}
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#228977] hover:bg-[#21665a] text-white"
                  >
                    <Save size={16} className="mr-1.5" />
                    Save Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
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
            onClick={handleNewPost} 
            className="bg-[#228977] hover:bg-[#21665a] text-white whitespace-nowrap"
          >
            <Plus size={16} className="mr-1.5" />
            Add New Job
          </Button>
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
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
                    <Button variant="outline" size="sm" className="text-[#228977] border-[#228977] hover:bg-[#f8fffe]" onClick={() => handleEditPost(post)}>
                      <Edit size={14} className="mr-1.5" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => handleDeletePost(post.id)}>
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
            onClick={handleNewPost} 
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

export default CareerDashboard;
