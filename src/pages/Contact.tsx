import React from 'react';
import PageLayout from '../components/PageLayout';
import MultiStepContactForm from '../components/MultiStepContactForm';
import ContactList from '../components/ContactList';

const Contact: React.FC = () => {
  return (
    <PageLayout 
      title="Contact Us"
      description="Get in touch with us through our contact form or manage existing submissions"
      maxWidth="max-w-4xl"
    >
        
        <MultiStepContactForm />
        <ContactList />
    </PageLayout>
  );
};

export default Contact;
