
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { CareerPost } from '@/components/admin/careers/types';

interface JobListingsProps {
  jobs: CareerPost[];
}

const JobListings = ({ jobs }: JobListingsProps) => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-primary text-center mb-12 animate-reveal">
          Open Positions
        </h2>
        
        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-card animate-reveal">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-primary">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="inline-flex items-center text-sm text-muted-foreground">
                        <MapPin size={16} className="mr-1" /> {job.location}
                      </span>
                      <span className="inline-flex items-center text-sm text-muted-foreground">
                        <Clock size={16} className="mr-1" /> {job.type}
                      </span>
                    </div>
                    <p className="mt-4 text-muted-foreground">{job.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-brand-primary mb-2">Requirements:</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {job.requirements}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    className="mt-6 md:mt-0 bg-brand-primary hover:bg-brand-secondary group"
                  >
                    Apply Now
                    <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                  </Button>
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
    </section>
  );
};

export default JobListings;
