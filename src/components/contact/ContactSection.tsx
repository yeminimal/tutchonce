
import React from 'react';

interface ContactSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, subtitle, description }) => {
  return (
    <div className="max-w-2xl">
      <span className="inline-block px-4 py-1.5 bg-clean-50 text-clean-800 rounded-full text-sm font-medium mb-6 animate-reveal">
        {subtitle}
      </span>
      <h2 className="text-4xl font-bold animate-reveal" style={{ transitionDelay: '100ms' }}>
        {title}
      </h2>
      <p className="mt-6 text-lg text-muted-foreground animate-reveal" style={{ transitionDelay: '200ms' }}>
        {description}
      </p>
    </div>
  );
};

export default ContactSection;
