
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/components/admin/blog/types';

interface BlogDialogProps {
  selectedPost: BlogPost | null;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

const BlogDialog = ({ selectedPost, showDialog, setShowDialog }: BlogDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedPost && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-brand-primary">{selectedPost.title}</DialogTitle>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <User size={14} className="mr-1" /> {selectedPost.author || 'Admin'}
                </span>
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-1" /> {new Date(selectedPost.date).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" /> {selectedPost.readingTime || '5 min read'}
                </span>
              </div>
            </DialogHeader>
            
            {selectedPost.image && (
              <div className="mt-4 rounded-lg overflow-hidden">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full max-h-[300px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/1200x600?text=Tutchonce+Cleaning';
                  }}
                />
              </div>
            )}
            
            <div className="mt-6">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
            
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;
