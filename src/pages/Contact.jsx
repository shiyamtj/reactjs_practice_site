import React from 'react';
import MultiStepContactForm from '../components/MultiStepContactForm';
import ContactList from '../components/ContactList';

const Contact = () => {
  return (
    <div className="min-h-screen section-padding bg-white dark:bg-slate-900">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Get in touch with us through our contact form or manage existing submissions
          </p>
        </div>
        
        <MultiStepContactForm />
        
        <div className="mt-16">
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default Contact;
