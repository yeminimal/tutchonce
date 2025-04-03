
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactInfoItem from './ContactInfoItem';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <Phone size={18} className="text-brand-primary" />,
      title: "WhatsApp",
      content: "+234 802 505 8426",
      link: "https://wa.me/+2348025058426"
    },
    {
      icon: <Phone size={18} className="text-brand-primary" />,
      title: "WhatsApp",
      content: "+234 803 722 6269",
      link: "https://wa.me/+2348037226269"
    },
    {
      icon: <Mail size={18} className="text-brand-primary" />,
      title: "Email",
      content: "tutchoncecleaningservices@gmail.com",
      link: "mailto:tutchoncecleaningservices@gmail.com",
      truncate: true
    },
    {
      icon: <MapPin size={18} className="text-brand-primary" />,
      title: "Service Area",
      content: "We deliver anywhere within Nigeria"
    }
  ];

  return (
    <div className="mt-10 space-y-6">
      {contactInfo.map((item, index) => (
        <ContactInfoItem 
          key={index} 
          icon={item.icon} 
          title={item.title} 
          content={item.content} 
          link={item.link}
          truncate={item.truncate}
        />
      ))}
    </div>
  );
};

export default ContactInfo;
