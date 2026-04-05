import React from 'react';
import MultiStepContactForm from '../components/MultiStepContactForm';
import ContactList from '../components/ContactList';

const Contact = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
              Contact Us
            </h1>
          </div>
          
          <MultiStepContactForm />
          
          <div className="mt-16">
            <ContactList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
