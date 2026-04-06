import { Meta, StoryObj } from '@storybook/react';
import MultiStepContactForm from '../components/MultiStepContactForm';
import { ContactProvider } from '../contexts/ContactContext';
import { ToastProvider } from '../contexts/ToastContext';
import React from 'react';

const meta: Meta<typeof MultiStepContactForm> = {
  title: 'Components/MultiStepContactForm',
  component: MultiStepContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-step contact form with validation, progress tracking, and submission handling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <ContactProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
            <div className="max-w-2xl mx-auto">
              <Story />
            </div>
          </div>
        </ToastProvider>
      </ContactProvider>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof MultiStepContactForm> = {
  parameters: {
    docs: {
      description: {
        story: 'Default multi-step contact form starting with personal information.',
      },
    },
  },
};

export const Interactive: StoryObj<typeof MultiStepContactForm> = {
  render: () => {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Multi-Step Contact Form Demo</h2>
          <p className="text-gray-600">This is a fully functional multi-step form with validation and state management.</p>
        </div>
        <MultiStepContactForm />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the complete multi-step form workflow.',
      },
    },
  },
};

export const WithBackground: StoryObj<typeof MultiStepContactForm> = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container-custom py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-purple-200 text-lg">Get in touch with our team</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <MultiStepContactForm />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form displayed with a dark gradient background.',
      },
    },
  },
};

export const InCard: StoryObj<typeof MultiStepContactForm> = {
  render: () => {
    return (
      <div className="card p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started</h2>
          <p className="text-gray-600">Fill out the form below to contact us</p>
        </div>
        <MultiStepContactForm />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form wrapped in a card container.',
      },
    },
  },
};
