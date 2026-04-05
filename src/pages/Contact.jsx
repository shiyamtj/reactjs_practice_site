import React from 'react';
import PageLayout from '../components/PageLayout';
import MultiStepContactForm from '../components/MultiStepContactForm';
import ContactList from '../components/ContactList';

const Contact = () => {
  return (
    <PageLayout 
      title="Contact Us"
      description="Get in touch with us through our contact form or manage existing submissions"
      maxWidth="max-w-4xl"
    >
        
        <MultiStepContactForm />
        
        <div className="mt-16">
          <ContactList />
        </div>
    </PageLayout>
  );
};

export default Contact;
