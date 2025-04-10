
import React from 'react';

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
  truncate?: boolean;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content, link, truncate = false }) => {
  if (link) {
    return (
      <div className="flex items-start animate-reveal hover:translate-x-1 transition-transform duration-300">
        <div className="h-10 w-10 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mr-4">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <a 
            href={link} 
            className={`text-muted-foreground mt-1 hover:text-brand-primary transition-colors ${truncate ? 'truncate-email' : ''}`}
            title={truncate ? content : undefined}
          >
            {content}
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start animate-reveal hover:translate-x-1 transition-transform duration-300">
      <div className="h-10 w-10 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-muted-foreground mt-1">{content}</p>
      </div>
    </div>
  );
};

export default ContactInfoItem;
