
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ChevronRight, Briefcase, Calendar, ArrowDown, ArrowUp } from 'lucide-react';
import { CareerPost } from '@/components/admin/careers/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface JobListingsProps {
  jobs: CareerPost[];
}

const JobListings = ({ jobs }: JobListingsProps) => {
  const [selectedJob, setSelectedJob] = useState<CareerPost | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  // Filter to only show active jobs on the frontend
  const activeJobs = jobs.filter(job => job.status === 'active');
  
  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };
  
  const openJobDetails = (job: CareerPost) => {
    setSelectedJob(job);
    setShowDialog(true);
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-primary text-center mb-12 animate-reveal">
          Open Positions
        </h2>
        
        {activeJobs.length > 0 ? (
          <div className="space-y-6">
            {activeJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-card animate-reveal">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-brand-primary">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="inline-flex items-center text-sm text-muted-foreground">
                        <MapPin size={16} className="mr-1" /> {job.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-muted-foreground">
                        <Clock size={16} className="mr-1" /> {job.type}
                      </span>
                      {job.salary && (
                        <span className="inline-flex items-center text-sm text-muted-foreground">
                          <Briefcase size={16} className="mr-1" /> {job.salary}
                        </span>
                      )}
                      <span className="inline-flex items-center text-sm text-muted-foreground">
                        <Calendar size={16} className="mr-1" /> Posted: {new Date(job.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div 
                        className="text-muted-foreground prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description.substring(0, expandedJobId === job.id ? undefined : 250) + (expandedJobId !== job.id && job.description.length > 250 ? '...' : '') }}
                      />
                      
                      {job.description.length > 250 && (
                        <button 
                          className="mt-2 text-brand-primary flex items-center text-sm font-medium"
                          onClick={() => toggleJobExpansion(job.id)}
                        >
                          {expandedJobId === job.id ? (
                            <>Show Less <ArrowUp size={14} className="ml-1" /></>
                          ) : (
                            <>Read More <ArrowDown size={14} className="ml-1" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 md:ml-6 flex flex-col items-start">
                    <Button
                      className="bg-brand-primary hover:bg-brand-secondary group"
                      onClick={() => openJobDetails(job)}
                    >
                      View Details
                      <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                    
                    <Button
                      className="mt-2 bg-brand-primary hover:bg-brand-secondary group"
                    >
                      Apply Now
                      <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-card">
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No Open Positions</h3>
            <p className="text-muted-foreground">We don't have any openings at the moment. Please check back later!</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6 animate-reveal">
            Don't see a position that matches your skills? We're always looking for talented individuals to join our team.
          </p>
          <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-light">
            Send Speculative Application
          </Button>
        </div>
      </div>
      
      {/* Job Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-brand-primary">{selectedJob.title}</DialogTitle>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    <MapPin size={16} className="mr-1" /> {selectedJob.location}
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    <Clock size={16} className="mr-1" /> {selectedJob.type}
                  </span>
                  {selectedJob.salary && (
                    <span className="inline-flex items-center text-sm text-muted-foreground">
                      <Briefcase size={16} className="mr-1" /> {selectedJob.salary}
                    </span>
                  )}
                </div>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-brand-primary mb-2">Job Description</h4>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-brand-primary mb-2">Requirements</h4>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedJob.requirements }}
                  />
                </div>
                
                {selectedJob.qualifications && (
                  <div>
                    <h4 className="text-lg font-medium text-brand-primary mb-2">Qualifications</h4>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedJob.qualifications }}
                    />
                  </div>
                )}
                
                {selectedJob.benefits && (
                  <div>
                    <h4 className="text-lg font-medium text-brand-primary mb-2">Benefits</h4>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedJob.benefits }}
                    />
                  </div>
                )}
                
                {selectedJob.applicationProcess && (
                  <div>
                    <h4 className="text-lg font-medium text-brand-primary mb-2">How to Apply</h4>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedJob.applicationProcess }}
                    />
                  </div>
                )}
                
                <div className="pt-4 flex justify-center">
                  <Button className="bg-brand-primary hover:bg-brand-secondary">
                    Apply for this Position
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default JobListings;
